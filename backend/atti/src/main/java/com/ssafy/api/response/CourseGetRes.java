package com.ssafy.api.response;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CourseGetRes {
	private Long courseId;
	private String courseName;
	private String courseTeacherName;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Date courseStartTime;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Date courseEndTime;
	private LocalDate courseDate;
}
