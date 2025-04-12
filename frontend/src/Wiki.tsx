import { useState, useEffect } from "react";
import "./Wiki.css";
import { Link } from "react-router-dom";

function Wiki() {
  type WikiFile = {
    name: string;
    type: string;
    publishDate?: string;
  };

  type GithubResponseItem = {
    path: string;
    type: "blob" | "tree";
  };

  const [files, setFiles] = useState<WikiFile[]>([]);
  const [folders, setFolders] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const wikiApiUrl =
    "https://api.github.com/repos/maxmulder03/BlueNucleusWiki/git/trees/main?recursive=1";

  const formattedName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchWikis = async () => {
      try {
        const response = await fetch(wikiApiUrl);
        const repoTree = await response.json();
        if (!repoTree || !repoTree.tree) return;

        // Ignores root directory files
        const filteredTree = repoTree.tree.filter(
          (item: GithubResponseItem) =>
            item.path.includes("/") || item.type === "tree",
        );

        filteredTree.forEach((item: GithubResponseItem) => {
          if (!item.type || !item.path) return;
          if (item.type === "blob") {
            const metadata = item.path.split("/");
            const fileName = metadata.pop()?.split(".")[0];
            const folderName = metadata.pop();
            if (fileName && folderName) {
              setFiles((prev) => [
                ...prev,
                {
                  name: fileName,
                  type: folderName,
                },
              ]);
            }
          } else if (item.type === "tree") {
            console.log(item);
            setFolders((prev) => [...prev, item.path]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchWikis();
  }, []);

  const handleFilterChange = (typeName: string) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(typeName)
        ? prevFilters.filter((f) => f !== typeName)
        : [...prevFilters, typeName],
    );
  };

  const filteredItems =
    activeFilters.length === 0
      ? files
      : files.filter((item) => activeFilters.includes(item.type));

  return (
    <>
      <h1>
        {" "}
        Blue Nucleus / <span className="h1-subpage"> wiki </span>{" "}
      </h1>
      <div className="grid grid-cols-[1fr_3fr] items-start justify-center">
        <div className="w-full">
          <div className="grid grid-cols-[1fr_3fr_1fr] pt-2 pb-1 border-b-[0.5px] items-center self-start text-left">
            <div> FILTER </div>
            <div className="whitespace-nowrap"> CLEAR FILTERS </div>
          </div>
          <ul>
            {folders.map((folder, idx) => (
              <li
                key={idx}
                className="m-0 p-0 list-none wiki-filter-section-container"
              >
                <input
                  type="checkbox"
                  className="border-[0.5px] border-primary-border rounded-[2pt] w-[10pt] h-[10pt]"
                  checked={activeFilters.includes(folder)}
                  onChange={() => handleFilterChange(folder)}
                />
                <label> {folder} </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full">
          <div className="wiki-table-titles grid grid-cols-[1fr_3fr_1fr] pt-2 pb-1 border-b-[0.5px] items-center self-start text-left">
            <div> DATE </div>
            <div> NAME </div>
            <div className="text-center pr-2">TYPE</div>
          </div>
          <ul>
            {filteredItems.map((item, idx) => (
              <li
                key={idx}
                className="m-0 p-1 list-none grid grid-cols-[1fr_3fr_1fr] border-b-[0.5px] items-center self-start text-left hover:bg-[var(--purple)]"
              >
                <div className="font-roboto"> {item.publishDate} </div>
                <Link to={`/wikis/${item.type.toLowerCase()}/${item.name}`}>
                  {formattedName(item.name)}
                </Link>
                <div className="flex items-center justify-center">
                  <div className="wiki-type-badge">
                    {" "}
                    {item.type.toUpperCase()}{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Wiki;
