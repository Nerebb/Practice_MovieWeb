import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Collapse, IconButton } from "@mui/material";
import { PlaylistAdd, PlaylistAddCheck } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import { ModalContext, PlaylistContext } from "../contexts";

export const CardHeight = 250;

export default function MovieCard({ ...props }) {
  const item = props.item;
  const [isAdded, setIsAdded] = React.useState(false);
  const [displayDescript, setDisplayDescript] = React.useState(false);
  const { setIsModal, setVideoId } = React.useContext(ModalContext);
  const { playList, setPlayList } = React.useContext(PlaylistContext);
  const navigate = useNavigate();

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  // verified

  function handleAddToList(movie) {
    setDisplayDescript(false);
    let addedMovies = [...playList];
    let item = localStorage.getItem(movie.id)
    if (!item) {
      addedMovies.push(movie);
      localStorage.setItem(movie.id, JSON.stringify(movie));
    } else {
      addedMovies = addedMovies.filter((i) => i.id !== movie.id);
      localStorage.removeItem(movie.id);
    }

    setPlayList([...addedMovies]);
    setIsAdded(!isAdded);
    !isAdded
      ? toast.success("Added to your playlist")
      : toast.error("Removed from your playlist");
  }

  function handleCardOnClick() {
    setDisplayDescript(!displayDescript);
  }

  function handleWatchNow() {
    setVideoId(item.id);
    setDisplayDescript(false);
    setIsModal(true);
  }

  function handleLearnMore() {
    navigate(`/${props.category}/${item.id}`);
  }

  const ImageCard = () => {
    return (
      <CardMedia
        component="img"
        sx={{ height: CardHeight, width: 1, objectFit: "cover" }}
        image={bg}
        onClick={() => handleCardOnClick()}
      />
    );
  };

  return (
    <Card sx={{ maxWidth: { xs: 1, sm: 345 }, position: "relative" }}>
      <ImageCard />
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={() => handleAddToList(item)}
      >
        {!playList.some((i) => i.id === item.id) ? (
          <PlaylistAdd />
        ) : (
          <PlaylistAddCheck />
        )}
      </IconButton>
      <Collapse in={displayDescript}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title || item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.overview}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleWatchNow()}
          >
            Watch Now
          </Button>
          <Button size="small" onClick={() => handleLearnMore()}>
            Learn More
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}
