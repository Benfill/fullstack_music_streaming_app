package io.benfill.isdb.service;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;

import io.benfill.isdb.dto.request.LoginDto;
import io.benfill.isdb.dto.request.UserDtoReq;
import io.benfill.isdb.dto.response.DeleteResp;
import io.benfill.isdb.dto.response.UserDtoResp;
import io.benfill.isdb.model.AuthToken;

public interface IAuthService {
	UserDtoResp registerHandler(UserDtoReq user);

	public AuthToken loginHandler(@RequestBody LoginDto body, HttpServletResponse resp);

	public DeleteResp logoutHandler(HttpServletResponse resp);
}
