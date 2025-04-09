import "./Wiki.css"
import { Link } from "react-router-dom"

function Wiki() {
  const WikiType = Object.freeze({
    BLOG: "Blog",
    VIDEO: "Video",
    PROJECT: "Project",
    TUTORIAL: "Tutorial",
    ONBOARDING: "Onboarding",
  })

  const items = [
    {
      publishDate: "2025.01.01",
      title: "New Hire Onboarding",
      type: WikiType.ONBOARDING,
    },
    {
      publishDate: "2025.01.01",
      title: "React Fundamentals",
      type: WikiType.BLOG,
    },
    {
      publishDate: "2025.01.02",
      title: "Git Good With Github",
      type: WikiType.TUTORIAL,
    },
    {
      publishDate: "2025.01.03",
      title: "Recommended Reading",
      type: WikiType.BLOG,
    },
    {
      publishDate: "2025.01.04",
      title: "What Makes A Good Engineer?",
      type: WikiType.BLOG,
    },
    {
      publishDate: "2025.01.05",
      title: "December 2024 Monthly Demos",
      type: WikiType.VIDEO,
    },
    {
      publishDate: "2025.01.06",
      title: "The Benefits of Payload",
      type: WikiType.BLOG,
    },
  ]

  return (
    <>
      <h1>
        {" "}
        Blue Nucleus / <span className="h1-subpage"> wiki </span>{" "}
      </h1>
      <div className="wiki-container">
        <div className="wiki-nav-container">
          <div className="wiki-content-description">
            <div> FILTER </div>
            <div> CLEAR FILTERS </div>
          </div>
          <ul>
            {Object.values(WikiType).map((typeName, idx) => (
              <li
                key={idx}
                className="m-0 p-0 list-none wiki-filter-section-container"
              >
                <input type="checkbox" className="wiki-filter-checkbox" />
                <label> {typeName} </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="wiki-content-container">
          <div className="wiki-content-description">
            <div> DATE </div>
            <div> NAME </div>
            <div> TYPE </div>
          </div>
          <ul>
            {items.map((item, idx) => (
              <li
                key={idx}
                className="m-0 p-1 list-none grid grid-cols-[1fr_3fr_1fr] border-b-[0.5px] items-center self-start text-left"
              >
                <div className="publish-date"> {item.publishDate} </div>
                <Link to={`/wikis/${item.type.toLowerCase()}/${item.title}`}>
                  {item.title}
                </Link>
                <div>
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
  )
}

export default Wiki
