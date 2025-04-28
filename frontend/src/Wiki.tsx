import { useState, useEffect } from "react";
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

  const folderColors = [
    "yellow",
    "lavender",
    "green",
    "blue",
    "rosewater",
    "mauve",
    "flamingo",
    "sky",
    "sapphire",
    "red",
    "peach",
  ];

  const wikiApiUrl =
    "https://api.github.com/repos/maxmulder03/BlueNucleusWiki/git/trees/main?recursive=1";

  const formattedName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getBadgeColor = (foldername: string) => {
    return folderColors[folders.indexOf(foldername)];
  };

  // Fetches & formats wiki file metadata from Github
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
              // TODO: Rework dedubplication logic, this isn't great
              setFiles((prev) =>
                [
                  ...prev,
                  {
                    name: fileName,
                    type: folderName,
                  },
                ].filter(
                  (f, i, arr) => arr.findIndex((x) => x.name === f.name) === i,
                ),
              );
            }
          } else if (item.type === "tree") {
            // TODO: Rework dedubplication logic, this isn't great
            setFolders((prev) =>
              [...prev, item.path].filter(
                (f, i, arr) => arr.findIndex((x) => x === f) === i,
              ),
            );
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
      {/* Filters Section */}
      <div className="grid grid-cols-[1fr_3fr] items-start justify-center">
        <div className="w-full" box-="square contain:!top">
          <span is-="badge" variant-="background0" className="pb-10">
            Filters
          </span>
          <div className="grid grid-cols-[1fr_3fr_1fr] pt-2 pb-1 items-center self-start text-left">
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

        {/* Wiki Files */}
        <div className="w-full" box-="square contain:!top">
          <h1 is-="badge" variant-="background0" className="pb-10">
            Wikis
          </h1>
          <div className="grid grid-cols-[1fr_3fr_1fr] pl-4 pr-4 pt-2 items-center self-start text-left">
            <div className="pb-1 border-b-[0.5px]"> DATE </div>
            <div className="pb-1 border-b-[0.5px]"> NAME </div>
            <div className="pb-1 border-b-[0.5px] text-center pr-2">TYPE</div>
          </div>
          <div className="p-4 pb-10 pt-0">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="m-0 pt-3 pb-3 p-1 list-none grid grid-cols-[1fr_3fr_1fr] border-b-[0.5px] items-center self-start text-left"
              >
                <div className="col-start-1">
                  {item.publishDate ?? "09.09.2022"}
                </div>

                <Link
                  to={`/wikis/${item.type.toLowerCase()}/${item.name}`}
                  className="col-start-2 hover:text-teal-200"
                >
                  {formattedName(item.name)}
                </Link>

                <div className="col-start-3 text-center">
                  <span is-="badge" variant-={getBadgeColor(item.type)}>
                    {item.type.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wiki;
