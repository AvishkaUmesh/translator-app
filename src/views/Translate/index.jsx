import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import TranslationService from "services/TranslationService";
import { romanToSinhalaConvert } from "services/romanToSInhalaConvert";

function Dashboard() {
  const [sourceLanguage, setSourceLanguage] = useState("singlish");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const handleLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const translateText = async () => {
    let inputPara = inputText;
    if (sourceLanguage === "singlish") {
      inputPara = romanToSinhalaConvert(inputText);
    }

    try {
      const translation = await TranslationService.translateText(inputPara);
      setTranslatedText(translation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
    }
  };

  return (
    <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
      <div>
        <Card
          extra={"w-full h-full sm:overflow-auto px-6"}
          style={{ padding: "16px" }}
        >
          <header className="relative flex items-center justify-between pt-4">
            <div className="text-xl font-bold text-navy-700 dark:text-white">
              Sinhala to English
            </div>
          </header>

          <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
            <TextField
              label="Input Text"
              multiline
              fullWidth
              value={inputText}
              onChange={handleInputChange}
              variant="outlined"
              rows={4}
              style={{ marginBottom: "16px" }}
            />
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <span>input language</span>
              </Grid>
              <Grid item xs={4}>
                <Select
                  label="Source Language"
                  fullWidth
                  value={sourceLanguage}
                  onChange={handleLanguageChange}
                  size="small"
                >
                  <MenuItem value="singlish">Singlish</MenuItem>
                  <MenuItem value="sinhala">Sinhala</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={translateText}
                  size="small"
                >
                  Translate
                </Button>
              </Grid>
            </Grid>
            <div className="mt-4">
              <TextField
                label="Translated Text"
                multiline
                fullWidth
                value={translatedText}
                variant="outlined"
                disabled
                rows={4}
                style={{ marginTop: "16px" }}
              />
              <IconButton
                aria-label="Copy"
                onClick={handleCopy}
                disabled={!translatedText}
                style={{ marginTop: "8px" }}
              >
                <FileCopyIcon />
              </IconButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
