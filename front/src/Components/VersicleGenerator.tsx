import { Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IBook } from "Interfaces/IBook";
import bible from 'Mocks';

const VersicleGenerator = () => {

  const [book, setBook] = useState<IBook>({
    bookIndex: 0,
    chapters: [],
    verses: [],
    chapterIndex: undefined,
    verseIndex: undefined
  });

  const [allOrOne, setAllOrOne] = useState(false);

  const handlerPassage = (e: SelectChangeEvent) => {
    setBook({
      ...book,
      bookIndex: Number(e.target.value),
      name: bible[Number(e.target.value)].name,
      chapters: bible[Number(e.target.value)].content,
      chapterIndex: undefined,
      verseIndex: undefined
    });
  };

  const loadChapters = (e?: SelectChangeEvent) => {
    !e ?
      setBook({
        ...book,
        chapterIndex: undefined,
        verseIndex:undefined
      }) : setBook({
        ...book,
        chapterIndex: Number(e.target.value),
        verses: bible[book.bookIndex].content[book.chapterIndex ? book.chapterIndex : 0]
      })
  }

  const loadVersicles = (e?: SelectChangeEvent) => {
    !e? 
    setBook({ ...book, verseIndex: undefined }):
    setBook({ ...book, verseIndex: Number(e.target.value) })
  }

  const handlerAllOrOne = () => setAllOrOne(!allOrOne);

  const handlerPreviewCap = () => setBook({
    ...book,
    chapterIndex: book.chapterIndex ? book.chapterIndex - 1 : undefined
  });
  const handlerNextCap = () => setBook({
    ...book, chapterIndex: book.chapterIndex ? book.chapterIndex + 1 : undefined
  });

  useEffect(() => {
    loadChapters(undefined);
    loadVersicles(undefined);
  }, [handlerPassage])


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      m: 3
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <FormControl sx={{ minWidth: '144px' }}>
          <InputLabel id="select-book">Livro</InputLabel>
          <Select labelId="select-book" label="Livro" value={book.name} onChange={handlerPassage}>
            {bible.map((b, i) => {
              return (
                <MenuItem value={i}> {b.name} </MenuItem>
              )
            })}
          </Select>
        </FormControl>

        <Button onClick={handlerPreviewCap}>Anterior</Button>
        <FormControl sx={{ minWidth: '80px' }}>
          <InputLabel id="select-chapter">Cap.</InputLabel>
          <Select labelId="select-chapter" label="Livro" value={String(book.chapterIndex)} onChange={loadChapters}>
            {book.chapters && (
              book.chapters.map((c, i) => {
                return (
                  <MenuItem value={i}> {i + 1} </MenuItem>
                )
              })
            )}
          </Select>
        </FormControl>
        <Button onClick={handlerNextCap}>Próximo</Button>

        <FormControl sx={{ minWidth: '80px' }}>
          <Checkbox value={allOrOne} onChange={handlerAllOrOne} placeholder="Apenas versiculo" />
        </FormControl>
        <FormControl sx={{ minWidth: '80px' }}>
          <InputLabel id="select-verse">Ver.</InputLabel>
          <Select label="Livro" value={String(book.verseIndex)} onChange={loadVersicles}>
            {book.verses.map((c, i) => {
              return (
                <MenuItem value={i}> {i + 1} </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>

      {!allOrOne && (
        <Box>
          {book.chapterIndex && (
            <Typography component="h4">
              {book.name}: Cap: {book.chapterIndex ? book.chapterIndex + 1 : null}
            </Typography>
          )}
          {book.verses.map((verse, index) => (
            <Typography component="h3" variant="h6">
              <Typography component="span"> "{index + 1}":</Typography>
              {verse}
            </Typography>
          ))}
        </Box>
      )}

      {allOrOne && (
        <Box>
          {book.chapterIndex && (
            <Typography component="h4">
              {book.name}: Cap: {book.chapterIndex + 1}
            </Typography>
          )}
          {book.verseIndex && (
            <Typography component="h3" variant="h4">
              <Typography component="span"> "{book.verseIndex + 1}":</Typography>
              "{book.verses[book.verseIndex]}"
            </Typography>
          )}
        </Box>
      )
      }
    </Box>
  );
}

export default VersicleGenerator;