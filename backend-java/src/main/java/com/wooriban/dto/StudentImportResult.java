package com.wooriban.dto;
import lombok.Getter;
import java.util.ArrayList;
import java.util.List;

@Getter
public class StudentImportResult {
    private int totalRows = 0;
    private int successCount = 0;
    private final List<String> errors = new ArrayList<>();

    public void addSuccess() {
        totalRows++;
        successCount++;
    }

    public void addError(int rowNumber, String reason) {
        totalRows++;
        errors.add((rowNumber + "행: " + reason));
    }
}
