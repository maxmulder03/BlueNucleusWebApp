interface AutocompleteParams {
  input: string;
  superSet: string[];
  setSubset: (data: string[]) => void;
  setSuggestion: (data: string) => void;
}

export function autocomplete({
  input,
  superSet,
  setSubset,
  setSuggestion,
}: AutocompleteParams) {
  if (input === "") {
    setSubset([]);
    return;
  }
  const matches = superSet.filter((val) =>
    val.toLowerCase().includes(input.toLowerCase()),
  );
  setSubset(matches);
  setSuggestion(matches[0]);
}
