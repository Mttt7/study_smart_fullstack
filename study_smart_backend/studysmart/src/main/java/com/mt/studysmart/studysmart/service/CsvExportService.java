package com.mt.studysmart.studysmart.service;

import java.io.Writer;

public interface CsvExportService {
    void writeFlashcardsToCsv(Writer writer,Long userId);
}
