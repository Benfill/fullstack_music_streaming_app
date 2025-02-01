package io.benfill.isdb.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider {

    @Value("${jwt.signing.key}")
    private String SECRET;

    @Value("${jwt.token.validity}")
    private int EXPIRATION;

    private final Logger logger = Logger.getLogger(TokenProvider.class.getName());

    private final UserDetailsService userDetailsService;

    public TokenProvider(UserDetailsService userDetailsService) {
	this.userDetailsService = userDetailsService;
    }

    public String extractUsername(String token) {
	return extractClaims(token, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
	final Claims claims = extractAllClaims(token);
	return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
	Map<String, Object> extractClaims = new HashMap<String, Object>();

	extractClaims.put("roles", userDetails.getAuthorities().stream()
		.map(grantedAuthority -> grantedAuthority.getAuthority()).collect(Collectors.toList()));

	Date issuedAt = new Date(System.currentTimeMillis());
	Date expirationDate = new Date(System.currentTimeMillis() + EXPIRATION);

	logger.info("Generating token for user: " + userDetails.getUsername() + ", issued at: " + issuedAt
		+ ", expires at: " + expirationDate);

	return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername()).setIssuer("Benfill/ISDB")
		.setIssuedAt(issuedAt).setExpiration(expirationDate).signWith(getSignInKey(), SignatureAlgorithm.HS256)
		.compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
	final String username = extractUsername(token);
	return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Claims extractAllClaims(String token) {
	try {
	    return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token.trim()).getBody();
	} catch (DecodingException e) {
	    logger.warning("Invalid token format: " + e.getMessage());
	    throw e;
	}
    }

    private Key getSignInKey() {
	byte[] keyBytes = Decoders.BASE64.decode(SECRET);
	return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String token) {
	Date expirationDate = extractExpiration(token);
	Date currentDate = new Date();
	long skew = 5 * 60 * 1000; // 5 minutes in milliseconds
	logger.info("Token expiration date: " + expirationDate);
	logger.info("Current date: " + currentDate);
	logger.info("Expiration check: " + expirationDate.before(new Date(currentDate.getTime() - skew)));
	return expirationDate.before(new Date(currentDate.getTime() - skew));
    }

    private Date extractExpiration(String token) {
	return extractClaims(token, Claims::getExpiration);
    }

    public List<String> extractRoles(String token) {
	return extractClaims(token, claims -> (List<String>) claims.get("roles"));
    }

    public String refreshToken(String token) {
	String username = extractUsername(token);
	UserDetails userDetails = userDetailsService.loadUserByUsername(username);
	return generateToken(userDetails);
    }
}