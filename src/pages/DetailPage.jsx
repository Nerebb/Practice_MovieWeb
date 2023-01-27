import { PlayArrow, PlaylistAdd, PlaylistAddCheck } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import { BannerButton } from "../components/MainBanner";
import { ModalContext } from "../contexts";

function DetailPage() {
  const { category, id } = useParams();
  
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [caster, setCaster] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const { setIsModal, setVideoId } = React.useContext(ModalContext);

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path) || "";

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    const getCaster = async () => {
      const casting = await tmdbApi.credits(category, item.id);
      setCaster(casting);
    };
    getCaster();
  }, [category, item]);

  const handleChipOnClick = (id) => {
    navigate(`/${category}/search/${id}`);
  };
  const handleWatchNow = () => {
    setVideoId(id);
    setIsModal(true);
  };
  const handleAddtoList = () => {
    setIsAdded(!isAdded);
    !isAdded
      ? toast.success("Added to your playlist")
      : toast.error("Removed from your playlist");
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {item && (
        <Card
          sx={{
            maxWidth: "1000px",
            height: {sm:"400px",md:"500px"},
            display: "flex",
            flexDirection: "row",
            background: (theme) => theme.palette.background.darkGrey90,
            backdropFilter: "blur(3px)",
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 1, width: "auto", objectFit: "contain" }}
            image={bg}
          />
          <Stack
            flexGrow={1}
            ml={2}
            spacing={2}
            sx={{ overflowY: "scroll", py: 2 }}
          >
            <Typography variant="h3">{item.title}</Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-start">
              {item.genres?.map((i) => (
                <Chip
                  key={i.id}
                  label={i.name}
                  sx={{ width: 100, height: 30 }}
                  onClick={() => handleChipOnClick(i.id)}
                />
              ))}
            </Stack>
            <Typography>{item.overview}</Typography>
            <Typography variant="h5">Casting</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              spacing={3}
              flexGrow={1}
            >
              {caster?.cast?.map(
                (i, idx) =>
                  idx < 4 && (
                    <Card
                      sx={{
                        width: "105px",
                        background: "transparent",
                        boxShadow: "none",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={apiConfig.w500Image(i.profile_path)}
                        sx={{
                          height: "140px",
                          width: 1,
                          objectFit: "fill",
                          borderRadius: "10px",
                        }}
                      />
                      <Typography>{i.name}</Typography>
                    </Card>
                  )
              )}
            </Stack>
            <CardActions>
              <BannerButton
                startIcon={<PlayArrow />}
                variant="contained"
                size="small"
                color="blue"
                sx={{ fontSize: "16px" }}
                onClick={() => handleWatchNow()}
              >
                Watch now
              </BannerButton>
              <BannerButton
                startIcon={!isAdded ? <PlaylistAdd /> : <PlaylistAddCheck />}
                variant="outlined"
                size="small"
                color="blue"
                sx={{ fontSize: "16px" }}
                onClick={() => handleAddtoList()}
              >
                Add to playlist
              </BannerButton>
            </CardActions>
          </Stack>
        </Card>
      )}
    </Box>
  );
}

export default DetailPage;
