import React, { useState } from "react";
import Button from "./Btn";
function TextFiled() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
  
    // Transformation functions
    const transformations = {
      Uppercase: (text) => text.toUpperCase(),
      Lowercase: (text) => text.toLowerCase(),
      Capitalize: (text) => text.replace(/\b\w/g, (char) => char.toUpperCase()),
      "Swap Case": (text) =>
        text.replace(/./g, (char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ),
      "Remove Extra spaces": (text) => text.replace(/\s+/g, " ").trim(),
      "Remove Punctuation": (text) => text.replace(/[^\w\s]|_/g, ""),
      "Remove Empty Lines": (text) => text.replace(/^\s*$(?:\r\n?|\n)/gm, ""),
      "Reverse Text": (text) => text.split("").reverse().join(""),
      "Reverse Words": (text) => text.split(" ").reverse().join(" "),
      "Remove line breaks": (text) => text.replace(/(\r\n|\n|\r)/gm, ""),
      "Generate Palindrome": (text) => text + text.split("").reverse().join(""),
      "Encode to URL Slug": (text) => encodeURIComponent(text),
      "Decode from URL slug": (text) => decodeURIComponent(text),
      "Encode to Base64": (text) => btoa(text),
      "Decode from Base64": (text) => atob(text),
      "Encode to Morse": (text) => encodeToMorse(text),
      "Decode from Morse": (text) => decodeFromMorse(text),
      "Encode to ROT13": (text) => encodeToROT13(text),
      "Decode from ROT13": (text) => decodeFromROT13(text),
      "Encode to ROT47": (text) => encodeToROT47(text),
      "Decode from ROT47": (text) => decodeFromROT47(text),
      "Encode to BBcode": (text) => encodeToBBcode(text),
      "Decode from BBcode": (text) => decodeFromBBcode(text),
      "Encode to ASCII": (text) => encodeToASCII(text),
      "Decode from ASCII": (text) => decodeFromASCII(text),
      "Encode to Binary": (text) => encodeToBinary(text),
      "Decode from Binary": (text) => decodeFromBinary(text),
      "Encode to Decimal": (text) => encodeToDecimal(text),
      "Decode from Decimal": (text) => decodeFromDecimal(text),
      "Encode to Octal": (text) => encodeToOctal(text),
      "Decode from Octal": (text) => decodeFromOctal(text),
      "Encode to Hex": (text) => encodeToHex(text),
      "Decode from Hex": (text) => decodeFromHex(text),
      "Encode HTML Code (escape tags only)": (text) => escapeHTMLTags(text),
      "Decode HTML Code (escape tags only)": (text) => unescapeHTMLTags(text),
      "Sort by letters (ascending)": (text) => sortByLetters(text, true),
      "Sort by letters (descending)": (text) => sortByLetters(text, false),
      "Sort by words (ascending)": (text) => sortByWords(text, true),
      "Sort by words (descending)": (text) => sortByWords(text, false),
      "Sort by lines (ascending)": (text) => sortByLines(text, true),
      "Sort by lines (descending)": (text) => sortByLines(text, false),
      "Sort by paragraph (ascending)": (text) => sortByParagraph(text, true),
      "Sort by paragraph (descending)": (text) => sortByParagraph(text, false),
    };
  
    const handleTransformation = (type) => {
      const transform = transformations[type];
      if (transform) setOutputText(transform(inputText));
    };
  
    const handlePasteFromClipboard = async () => {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    };
  
    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(outputText);
    };
  
    const handleImportFile = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setInputText(e.target.result);
        };
        reader.onerror = (e) => {
          console.error("Error reading file:", e);
        };
        reader.readAsText(file);
      }
    };
  
    const handleExportFile = () => {
      const blob = new Blob([outputText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "output.txt";
      a.click();
      URL.revokeObjectURL(url);
    };
  
    // Helper functions for transformations
    const encodeToMorse = (text) => {
        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
            '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
            ' ': '/'
        };
        return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    };

    const decodeFromMorse = (text) => {
        const morseCode = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
            '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
            '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z',
            '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
            '/': ' '
        };
        return text.split(' ').map(code => morseCode[code] || code).join('');
    };

    const encodeToROT13 = (text) => {
        return text.replace(/[a-zA-Z]/g, (char) =>
            String.fromCharCode(
                char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13)
            )
        );
    };

    const decodeFromROT13 = encodeToROT13; // ROT13 is symmetric

    const encodeToROT47 = (text) => {
        return text.replace(/[!-~]/g, (char) =>
            String.fromCharCode(33 + ((char.charCodeAt(0) + 14) % 94))
        );
    };

    const decodeFromROT47 = encodeToROT47; // ROT47 is symmetric

    const encodeToBBcode = (text) => {
        return text.replace(/</g, '[lt]').replace(/>/g, '[gt]');
    };

    const decodeFromBBcode = (text) => {
        return text.replace(/\[lt\]/g, '<').replace(/\[gt\]/g, '>');
    };

    const encodeToASCII = (text) => {
        return text.split('').map(char => char.charCodeAt(0)).join(' ');
    };

    const decodeFromASCII = (text) => {
        return text.split(' ').map(code => String.fromCharCode(code)).join('');
    };

    const encodeToBinary = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    };

    const decodeFromBinary = (text) => {
        return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    };

    const encodeToDecimal = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(10)).join(' ');
    };

    const decodeFromDecimal = (text) => {
        return text.split(' ').map(dec => String.fromCharCode(parseInt(dec, 10))).join('');
    };

    const encodeToOctal = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(8)).join(' ');
    };

    const decodeFromOctal = (text) => {
        return text.split(' ').map(oct => String.fromCharCode(parseInt(oct, 8))).join('');
    };

    const encodeToHex = (text) => {
        return text.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
    };

    const decodeFromHex = (text) => {
        return text.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
    };

    const escapeHTMLTags = (text) => {
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };

    const unescapeHTMLTags = (text) => {
        return text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    };

    const sortByLetters = (text, ascending = true) => {
        return text.split('').sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)).join('');
    };

    const sortByWords = (text, ascending = true) => {
        return text.split(' ').sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)).join(' ');
    };

    const sortByLines = (text, ascending = true) => {
        return text.split('\n').sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)).join('\n');
    };

    const sortByParagraph = (text, ascending = true) => {
        return text.split('\n\n').sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)).join('\n\n');
    };
  
    return (
      <div className="px-5 py-2 d-flex flex-column">
        <div className="d-flex flex-row border rounded shadow-sm">
          <div className="d-flex flex-column border p-3">
            <label className="font-weight-bold py-1">Input:</label>
            <textarea
              className="form-control mb-2"
              rows="7"
              cols="300"
              style={{ resize: "none" }}
              placeholder="Type your input here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            <div className="d-flex flex-row justify-content-between">
              <Button text="Paste from Clipboard" onClick={handlePasteFromClipboard} />
              <label>
                <input
                  type="file"
                  accept=".txt"
                  style={{ display: "none" }}
                  onChange={handleImportFile}
                />
                <Button text="Import .txt File" />
              </label>
            </div>
          </div>
          <div className="d-flex flex-column border p-3">
            <label className="font-weight-bold py-1">Output:</label>
            <textarea
              className="form-control mb-2"
              rows="7"
              cols="300"
              style={{ resize: "none" }}
              disabled
              placeholder="Output will appear here..."
              value={outputText}
            ></textarea>
            <div className="d-flex flex-row justify-content-between">
              <Button text="Copy to Clipboard" onClick={handleCopyToClipboard} />
              <Button text="Export as .txt File" onClick={handleExportFile} />
            </div>
          </div>
        </div>
        <div className="action-buttons d-flex flex-row flex-wrap mt-3">
          {Object.keys(transformations).map((text, index) => (
            <Button key={index} text={text} onClick={() => handleTransformation(text)} />
          ))}
        </div>
      </div>
    );
  }
  
  export default TextFiled;