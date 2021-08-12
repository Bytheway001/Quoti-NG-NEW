import React, { useState } from "react";
import { useFiles } from "./context";
import { Table, Card, Button, ButtonGroup } from "react-bootstrap";
import { APIURL } from "../../utils";

export const FileTable: React.FC = () => {
  const [category, setCategory] = useState("all");
  const { files, filters } = useFiles();
  const filteredFiles = files
    .filter((file) =>
      filters.company === 0 ? true : file.company_id === filters.company
    )
    .filter((file) => (filters.year === 0 ? true : file.year === filters.year));
  const categories = Array.from(new Set(filteredFiles.map((x) => x.category)));

  return (
    <Card.Body>
      <ButtonGroup className="w-100 d-none d-xl-block">
        <Button
          className={`tab-button`}
          onClick={() => setCategory("all")}
          size="sm"
        >
          Todo
        </Button>
        {categories.map((c) => {
          let active = c === category ? "active" : "";
          return (
            <Button
              className={`tab-button ${active}`}
              onClick={() => setCategory(c)}
              size="sm"
            >
              {c}
            </Button>
          );
        })}
      </ButtonGroup>
      <Table size="sm" style={{ fontSize: "0.8em" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Compañia</th>
            <th>Año</th>
            <th>Idioma</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles
            .filter((x) =>
              category === "all" ? true : category === x.category
            )
            .map((file, key: number) => (
              <tr>
                <td>{file.file_desc}</td>
                <td>{file.company.name}</td>
                <td>{file.year}</td>
                <td>{file.lang}</td>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href={APIURL + file.url}
                    target="_blank"
                  >
                    Descargar
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Card.Body>
  );
};
