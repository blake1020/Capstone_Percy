import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Homepage.css";
import book1Cover from "../assests/images/percy-jackson-lightning-thief.jpg";
import book2Cover from "../assests/images/percy-jackson-sea-of-monsters.jpg";
import book3Cover from "../assests/images/percy-jackson-the-titans-curse.jpg";
import book4Cover from "../assests/images/percy-jackson-battle-of-labyrinth.jpg";
import book5Cover from "../assests/images/percy-jackson-the-last-olympian.jpg";

function HomePage() {
  const [books] = useState([
    {
      id: 1,
      cover: book1Cover,
      blurb:
        "Percy Jackson, a twelve-year-old who discovers he's a demigod, the son of Poseidon. After learning about his heritage and being accused of stealing Zeus’s lightning bolt, Percy embarks on a quest to find the bolt and prevent a war among the gods. Joined by his friends Annabeth Chase, daughter of Athena, and Grover, a satyr, Percy navigates a world of Greek mythology brought to life, confronts various mythical creatures, and uncovers startling truths about his own identity. Through his journey, Percy learns about friendship, bravery, and his role in the world of gods and monsters.",
    },
    {
      id: 2,
      cover: book2Cover,
      blurb:
        "Percy Jackson, who discovers that his friend Grover, the satyr, is in danger. Grover has been captured by the monstrous Titan Kronos and is being held in the Sea of Monsters, which is also known as the Bermuda Triangle. Percy, along with his friends Annabeth Chase and Tyson, his half-brother who is a Cyclops, embarks on a perilous journey to rescue Grover and retrieve the Golden Fleece. The Fleece has the power to heal and protect their home, Camp Half-Blood, which is under threat from a growing evil. During their quest, they face various challenges, including encounters with dangerous creatures and rival demigods. Through bravery and teamwork, Percy and his friends confront new dangers and uncover secrets about their past and the looming threat of Kronos. The story explores themes of loyalty, family, and the struggle between good and evil.",
    },
    {
      id: 3,
      cover: book3Cover,
      blurb:
        "Percy Jackson embarks on a new quest with his friends Annabeth and Grover. They are joined by the goddess Artemis, who has gone missing along with her Hunter, Thalia Grace. The group must navigate perilous obstacles and battle mythical creatures to find Artemis and prevent the Titan Atlas from rising to power. As they confront these dangers, Percy uncovers more about his own fate and the ominous prophecy that could shape the future of the gods.",
    },
    {
      id: 4,
      cover: book4Cover,
      blurb:
        "Percy Jackson faces a summer of escalating danger as he learns that the ancient Labyrinth, a magical maze, is being exploited by the Titan army to invade Camp Half-Blood and attack Mount Olympus. To thwart this threat, Percy, along with Annabeth, Grover, and the Cyclops Tyson, embarks on a perilous quest through the ever-shifting Labyrinth. Their journey is fraught with deadly traps and mythical creatures, and they must find Daedalus, the maze's creator, to stop the invasion. As they uncover secrets about the Labyrinth and their own destinies, they confront formidable challenges that test their bravery and teamwork. The adventure builds to a dramatic battle to protect their camp and set the stage for the impending conflict with the Titan Kronos.",
    },
    {
      id: 5,
      cover: book5Cover,
      blurb:
        "Percy Jackson faces his most critical challenge as the prophecy foretold in his youth comes to fruition. With Kronos and his Titan army poised to attack Mount Olympus, Percy leads the demigods in a desperate battle to defend New York City and the heart of the Olympian realm. As the conflict escalates, Percy grapples with his role in the prophecy, the true nature of his powers, and his destiny. Allies are tested, betrayals are revealed, and crucial decisions must be made. The story culminates in a climactic confrontation that will determine the fate of the gods and the future of the world, with Percy discovering his own strength and the power of sacrifice.",
    },
  ]);
  const fetchBooks = async () => {
    //fetch reviews
    const res = await axios.get("http://localhost:3002/books");
    //set to state
    console.log(res);
  };
  fetchBooks();

  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  const [flippedBook, setFlippedBook] = useState(null);

  const handleClick = (id) => {
    setFlippedBook(flippedBook === id ? null : id);
  };

  useEffect(() => {
    //fetch api data
    axios.get("");
  });
  return (
    <div className="book-container">
      {books.map((book) => (
        <div
          key={book.id}
          className={`book ${flippedBook === book.id ? "flipped" : ""}`}
          onClick={() => handleClick(book.id)}
        >
          <div className="cover">
            <img src={book.cover} alt={`Percy Jackson Book ${book.id}`} />
          </div>
          <div className="content">
            <p>{book.blurb}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
