import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  Alert,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import TranslationService from "services/TranslationService";
import Singlish from "services/singlish";

function TranslatePage() {
  const [sourceLanguage, setSourceLanguage] = useState("singlish");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const singlish = new Singlish();

  const handleLanguageChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    // Clear validation error message when user starts typing
    setValidationError(null);
  };

  const translateText = async () => {
    setIsLoading(true);
    setRequestError(null);

    if (inputText.trim() === "") {
      setValidationError("Input text cannot be empty.");
      setIsLoading(false);
      return;
    }

    let inputPara = inputText;
    if (sourceLanguage === "singlish") {
      inputPara = singlish.parse(inputText);
    }

    try {
      const translation = await TranslationService.translateText(inputPara);
      setTranslatedText(translation);
    } catch (error) {
      setRequestError(
        "An error occurred while translating. Please try again later."
      );
      console.error(error);
    } finally {
      setIsLoading(false);
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
            <div className="text-xl font-bold text-navy-700">
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
              style={{ marginBottom: "16px", marginTop: "6px" }}
              required
              error={validationError !== null}
              helperText={validationError}
            />
            {sourceLanguage === "singlish" && (
              <div className="mt-2">
                <Typography variant="body1">
                  Converted Text Sinhala:
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  value={singlish.parse(inputText)}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  rows={2}
                  style={{ marginTop: "8px" }}
                />
              </div>
            )}
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <Typography variant="body1">Input Language</Typography>
              </Grid>
              <Grid item xs={4} style={{ marginTop: "16px" }}>
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
              <Grid item xs={4} style={{ marginTop: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={translateText}
                  size="small"
                  disabled={isLoading}
                >
                  {isLoading ? "Translating..." : "Translate"}
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
                InputProps={{
                  readOnly: true,
                }}
                rows={4}
                style={{ marginTop: "16px" }}
              />
              {requestError && (
                <Alert
                  severity="error"
                  style={{ marginBottom: "15px", marginTop: "18px" }}
                >
                  {requestError}
                </Alert>
              )}

              <IconButton
                aria-label="Copy"
                onClick={handleCopy}
                disabled={!translatedText || isLoading}
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

export default TranslatePage;
