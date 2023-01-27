import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import { InfoOutlined, LogoDev, PlayArrow } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import tmdbApi, { category, movieType } from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../contexts";

export const BannerButton = styled(Button)(({ theme }) => ({
  px: 2,
  py: 1,
  fontWeight: "Bold",
  fontSize: "18px",
}));

export default function MainBanner() {
  const [mainItem, setMainItem] = React.useState("");
  const [bgUrl, setBgUrl] = React.useState(
    "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"
  );
  const navigate = useNavigate();
  const { setIsModal, setVideoId } = React.useContext(ModalContext);

  React.useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        const randomIdx = Math.floor(Math.random() * response.results.length);
        setMainItem(response.results[randomIdx]);
        setBgUrl(
          apiConfig.originalImage(
            response.results[randomIdx].backdrop_path
              ? response.results[randomIdx].backdrop_path
              : response.results[randomIdx].poster_path
          )
        );
        setVideoId(response.results[randomIdx].id);
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, [setVideoId]);

  function handleMoreInfo() {
    navigate(`/${category.movie}/${mainItem.id}`);
  }

  function handleWatchNow() {
    setIsModal(true);
  }

  return (
    <>
      <Card
        sx={{
          width: 1,
          height: "100vh",
          position: "relative",
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "1", height: "100vh" }}
          image={bgUrl}
        />
        <CardContent
          sx={{
            position: "absolute",
            maxWidth: "1000px",
            bottom: {xs:"0",lg:"100px"},
            ml: 5,
          }}
        >
          <Box display="flex">
            <LogoDev sx={{ fontSize: { xs: "40px", lg: "50px" } }} />
            <Typography
              sx={{ fontSize: { xs: "30px", lg: "50px" }, fontWeight: "Bold" }}
              ml={1}
            >
              {mainItem.title}
            </Typography>
          </Box>
          <CardActions>
            <Stack spacing={3} direction={{ xs: "column", sm: "row" }}>
              <BannerButton
                startIcon={<PlayArrow />}
                variant="contained"
                size="large"
                color="blue"
                onClick={() => handleWatchNow()}
              >
                Watch now
              </BannerButton>
              <BannerButton
                startIcon={<InfoOutlined />}
                variant="outlined"
                size="large"
                color="blue"
                onClick={() => handleMoreInfo()}
              >
                More Info
              </BannerButton>
            </Stack>
          </CardActions>
        </CardContent>
      </Card>
    </>
  );
}
