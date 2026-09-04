import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import { FONT_FAMILY } from "./fonts";
import type { ResumeInput } from "./schemas";

// STUB — layout not implemented yet. generateResumePDF() in index.ts throws
// before this component is ever rendered; it exists so the file/type shape
// requested for this pass is in place. Build the real layout (contact
// header, summary, experience/projects/education/skills/custom sections)
// in the next pass, once the cover letter path is confirmed working.

const styles = StyleSheet.create({
  page: {
    padding: 64,
    fontFamily: FONT_FAMILY,
    fontSize: 11,
  },
});

interface ResumeDocumentProps {
  input: ResumeInput;
}

export function ResumeDocument({ input: _input }: ResumeDocumentProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text>Resume layout not yet implemented.</Text>
      </Page>
    </Document>
  );
}
