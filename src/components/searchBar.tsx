import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

interface SearchBarProps {
  isSearchPage?: boolean;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchPage = false,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Inicializar el término de búsqueda si estamos en la SearchPage
    if (isSearchPage) {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get("query") || "";
      setSearchTerm(query);
    }
  }, [isSearchPage, location.search]);

  useEffect(() => {
    if (isSearchPage && onSearch) {
      const timer = setTimeout(() => onSearch(searchTerm), 300);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, isSearchPage, onSearch]);

  const handleSearch = () => {
    if (!isSearchPage) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container
      style={{
        position: "relative",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        maxWidth: "500px",
        width: "100%",
        padding: "0 16px",
      }}
    >
      <TextField
        variant="outlined"
        placeholder={isSearchPage ? "Buscar Productos" : "Buscar Proveedores"}
        autoComplete="off"
        fullWidth
        style={{
          backgroundColor: isSearchPage ? "#eaeaea" : "#fafafa",
          borderRadius: "50px",
          height: "60px",
        }}
        InputProps={{
          style: {
            padding: "2px 20px",
            borderRadius: "50px",
            border: "none",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

export default SearchBar;
