import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { FONT_FAMILY } from "./fonts";
import type { CoverLetterInput } from "./schemas";

const styles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingBottom: 64,
    paddingHorizontal: 72,
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    color: "#1a1a1a",
    lineHeight: 1.5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 10,
    color: "#4a4a4a",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  paragraph: {
    marginBottom: 14,
  },
});

interface CoverLetterDocumentProps {
  input: CoverLetterInput;
}

// Splits on blank lines so the caller can hand over one pre-composed string
// (per the input schema) while the template still renders each paragraph as
// its own block with its own spacing, rather than one unbroken run of text.
function splitParagraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

export function CoverLetterDocument({ input }: CoverLetterDocumentProps) {
  const paragraphs = splitParagraphs(input.body);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View>
          <Text style={styles.name}>{input.contact.name}</Text>
          <Text style={styles.contactLine}>
            {input.contact.email} · {input.contact.phone}
          </Text>
        </View>

        <View style={styles.divider} />

        <View>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
