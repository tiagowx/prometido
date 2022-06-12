import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useState } from "react";
import { IBook } from "Interfaces/IBook";
import bible from 'Mocks';

const VersicleGenerator = () => {

  const [book, setBook] = useState<IBook>({
    chapter: [],
    bookIndex: 0,
    chapterIndex: 0,
    verses: [],
    verseIndex: 0
  });


  const handlerPassage = (e: SelectChangeEvent) => {

    setBook({
      ...book,
      bookIndex: Number(e.target.value),
      chapter: bible[Number(e.target.value)].content,
    });

  };

  const loadChapters = (e: SelectChangeEvent) => {
    setBook({
      ...book,
      chapterIndex: Number(e.target.value),
      verses: bible[book.bookIndex].content[book.chapterIndex]
    })
  }
  const loadVersicles = (e: SelectChangeEvent) => {
    setBook({ ...book, verseIndex: Number(e.target.value) })
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
        
      }}>
        <Select label="Livro" value={book.name} onChange={handlerPassage}>
          {bible.map((b, i) => {
            return (
              <MenuItem value={i}> {b.name} </MenuItem>
            )
          })}
        </Select>
        <Select label="Livro" value={String(book.chapterIndex)} onChange={loadChapters}>
          {book.chapter.map((c, i) => {
            return (
              <MenuItem value={i}> {i + 1} </MenuItem>
            )
          })}
        </Select>
        <Select label="Livro" value={String(book.verseIndex)} onChange={loadVersicles}>
          {book.verses.map((c, i) => {
            return (
              <MenuItem value={i}> {i + 1} </MenuItem>
            )
          })}
        </Select>

      </Box>
      <Typography component="h3" variant="h3">{book.verses[book.verseIndex]}</Typography>
    </Box >
  );
}

export default VersicleGenerator;