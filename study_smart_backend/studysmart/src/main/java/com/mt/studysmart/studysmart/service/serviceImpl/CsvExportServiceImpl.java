package com.mt.studysmart.studysmart.service.serviceImpl;

import com.mt.studysmart.studysmart.dao.FlashcardRepository;
import com.mt.studysmart.studysmart.entity.Flashcard;
import com.mt.studysmart.studysmart.service.CsvExportService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Writer;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvExportServiceImpl implements CsvExportService {

    private final FlashcardRepository flashcardRepository;

    public void writeFlashcardsToCsv(Writer writer,Long userId){
        List<Flashcard> flashcards = flashcardRepository.findAllByFlashcardDeck_UserProfile_IdOrderByFlashcardDeckAsc(userId);

        try (CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            csvPrinter.printRecord("ID","DECK_ID","FRONT_CONTENT","BACK_CONTENT","CREATED" );
            for (Flashcard flashcard : flashcards) {
                csvPrinter.printRecord(flashcard.getId(),flashcard.getFlashcardDeck().getId(), flashcard.getFrontContent(), flashcard.getBackContent(), flashcard.getDateCreated());
            }
        } catch (IOException e) {
            System.out.println("Error While writing CSV "+ e);
        }
    }
}

