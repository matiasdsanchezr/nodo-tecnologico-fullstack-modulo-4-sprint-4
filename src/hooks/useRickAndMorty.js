import { useState, useEffect, useMemo, useCallback } from "react";
import axios, { CanceledError } from "axios";

const API_BASE_URL = "https://rickandmortyapi.com/api/character/";

const buildUrl = (page, filterData) => {
  const params = new URLSearchParams();
  params.append("page", String(page));

  if (filterData && Object.keys(filterData).length > 0) {
    Object.entries(filterData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  return `${API_BASE_URL}?${params.toString()}`;
};

/**
 * Custom hook for interacting with the Rick and Morty API
 * @param initialPage - Starting page number (default: 1)
 * @param initialFilter - Initial filter criteria
 */
export const useRickAndMorty = (initialPage = 1, initialFilter) => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [filters, setFilters] = useState(initialFilter ?? {});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [paginationInfo, setPaginationInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  const fetchCharacters = useCallback(
    async (abortSignal) => {
      try {
        setLoading(true);
        setError(undefined);

        const requestUrl = buildUrl(currentPage, filters);
        const response = await axios.get(requestUrl, {
          signal: abortSignal,
        });

        console.log(response.data);
        setCharacters(response.data.results);
        setPaginationInfo(() => ({
          ...response.data.info,
        }));
        setLoading(false);
      } catch (err) {
        if (err instanceof CanceledError) {
          console.log("Request canceled:", err.message);
          setCharacters([]);
          return;
        }

        const axiosError = err;
        setError({
          status: axiosError.response?.status ?? 500,
          message: axiosError.message || "An unknown error occurred",
        });
        setCharacters([]);
      }

      setLoading(false);
    },
    [filters, currentPage]
  );

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= paginationInfo.pages) {
        setCurrentPage(page);
      }
    },
    [paginationInfo.pages]
  );

  const goToNextPage = useCallback(() => {
    if (paginationInfo.next) {
      setCurrentPage((prev) => {
        console.log(prev + 1);
        return prev + 1;
      });
    }
  }, [paginationInfo.next]);

  const goToPrevPage = useCallback(() => {
    if (paginationInfo.prev) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [paginationInfo.prev]);

  const filterCharacters = useCallback((newFilter) => {
    setFilters(newFilter);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    void fetchCharacters(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [currentPage, filters, fetchCharacters]);

  return useMemo(() => {
    return {
      characters,
      paginationInfo,
      currentPage,
      loading,
      error,
      filters,
      fetchCharacters,
      filterCharacters,
      clearFilters,
      goToNextPage,
      goToPrevPage,
      goToPage,
    };
  }, [
    characters,
    paginationInfo,
    currentPage,
    loading,
    error,
    filters,
    fetchCharacters,
    filterCharacters,
    clearFilters,
    goToNextPage,
    goToPrevPage,
    goToPage,
  ]);
};
