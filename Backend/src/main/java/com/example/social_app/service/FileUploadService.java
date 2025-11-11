package com.example.social_app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class FileUploadService {
	
	@Value("${upload.path:uploads}")
	private String uploadDir;
	
	private static final List<String> ALLOWED_IMAGE_TYPES = List.of(
			"image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg");
	
		// upload file
	public String uploadFile(MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {
			throw new IOException("No file selected or file is empty");
		}
		
		String contentType = file.getContentType();
		if(contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
			throw new IOException("Invalid file type. Only image files are allowed (JPEG, PNG, GIF, WEBP).");
		}
		
		File dir = new File(uploadDir);
		if(!dir.exists()) {
			dir.mkdir();
		}
		
		String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		
		Path filePath = Paths.get(uploadDir, fileName);
		Files.write(filePath, file.getBytes());
		
		return "/uploads/" + fileName;
	}
		
		// delete file
	public boolean deleteFile(String fileUrl) {
		if(fileUrl == null || fileUrl.isBlank()) return false;
		
		String relativePath = fileUrl.replaceFirst("^/uploads/","");
		
		Path filePath = Paths.get(uploadDir, relativePath);
		try {
			return Files.deleteIfExists(filePath);
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

}
