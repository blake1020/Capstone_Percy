import React from "react";
import Slider from "react-slick";
import CharacterCard from "./CharacterCard";
import "../css/Carousel.css";

// const characters = [
//   {
//     id: 6,
//     name: "Leo Valdez",
//     godlyParent: ["Greek: Hephaestus", "Roman: Vulcan"],
//     seriesAppearedIn: ["The Hereos of Olympus", "The Trials of Apollo"],
//   },
//   {
//     id: 7,
//     name: "Reyna Avila Ramirez-Arellano",
//     godlyParent: ["Roman P "],
//     seriesAppearedIn: ["The Hereos of Olympus"],
//   },
//   {
//     id: 8,
//     name: "Frank Zhang",
//     godlyParent: ["Greek: Ares", "Roman: Mars"],
//     seriesAppearedIn: ["The Heroes of Olympus"],
//   },
//   {
//     id: 9,
//     name: "Nick de Angelo",
//     godlyParent: ["Greek: Hades", "Roman: Pluto"],
//     seriesAppearedIn: [
//       "Percy Jackson and the Olympians",
//       "The Heroes of Olympus",
//       "The Trials of Apollo",
//     ],
//   },
//   {
//     id: 17,
//     name: "Charles Beckendorf",
//     godlyParent: ["Greek: Hephaestus", "Roman: Vulcan"],
//     seriesAppearedIn: ["Percy Jackson and the Olympians"],
//   },
//   {
//     id: 10,
//     name: "Rachel Elizabeth Dare",
//     godlyParent: ["Oracle at Camp HalfBlood"],
//     seriesAppearedIn: [
//       "Percy Jackson and the Olympians",
//       "The Heroes of Olympus",
//       "The Trials of Apollo",
//     ],
//   },
//   {
//     id: 11,
//     name: "Hazel Levesque",
//     godlyParent: ["Greek: Hades", "Roman: Pluto"],
//     seriesAppearedIn: ["The Heroes of Olympus"],
//   },
//   {
//     id: 12,
//     name: "Clarisse La Rue",
//     godlyParent: ["Greek: Ares", "Roman: Mars"],
//     seriesAppearedIn: [
//       "Percy Jackson and the Olympians",
//       "The Heroes of Olympus",
//     ],
//   },
//   {
//     id: 13,
//     name: "Selena Beauregard",
//     godlyParent: ["Greek: Aphrodite", "Roman: Venus"],
//     seriesAppearedIn: ["Percy Jackson and the Olympians"],
//   },
//   {
//     id: 14,
//     name: "Octavian",
//     godlyParent: ["Greek: Apollo", "Roman: Apollo", "Augur of Camp Jupiter"],
//     seriesAppearedIn: ["The Heroes of Olympians"],
//   },
//   {
//     id: 15,
//     name: "Thalia Grace",
//     godlyParent: ["Greek: Zeus", "Roman: Jupiter"],
//     seriesAppearedIn: [
//       "Percy Jackson and the Olympians",
//       "The Heroes of Olympians",
//       "The Trials of Apollo",
//     ],
//   },

//   {
//     id: 16,
//     name: "Bianca di Angelo",
//     godlyParent: ["Greek: Hades", "Roman: Pluto"],
//     seriesAppearedIn: ["Percy Jackson and the Olympians"],
//   },
// ];

const CharacterCarousel = ({ characters }) => {
  console.log("Characters recieved from CharterPage", characters);
  const settings = {
    dots: true,
    // infinite: true,
    // speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="character-carousel">
      {/* {...settings}>*/}
      {characters.map((characters) => (
        <CharacterCard key={characters.id} characters={characters} />
      ))}
    </div>
  );
};
export default CharacterCarousel;
