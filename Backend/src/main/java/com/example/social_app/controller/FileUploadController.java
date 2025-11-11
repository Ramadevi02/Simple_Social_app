package com.example.social_app.controller;

import com.example.social_app.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/upload")

public class FileUploadController {
	
		@Autowired
		private FileUploadService fileUploadService;
		
		@PostMapping("/image")
		public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
			try {
				String fileUrl = fileUploadService.uploadFile(file);
				return ResponseEntity.ok(fileUrl);
			} catch (IOException e) {
				return ResponseEntity.badRequest().body("File upload failed: " + e.getMessage());
			}
		}
}
