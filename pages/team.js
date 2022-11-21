import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Card, CardContent, CardMedia, Grid, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Layout } from "../src/components/atoms";
import GeneralHelper from "../src/utils/GeneralHelper";

const team = [
  {
    name: "Tanishq Sangwan",
    title: "CEO",
    profile: "https://github.com/sadashii.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis consequatur consequuntur itaque modi odio officia voluptates! Autem blanditiis delectus error ipsa ipsam, magnam natus nobis placeat quae quidem reiciendis.",
    github: "https://github.com/Sadashii",
    linkedin: "www.linkedin.com/in/tanishq-sangwan"
  },
  {
    name: "Tanishq Sangwan",
    title: "Web Developer",
    profile: "https://github.com/sadashii.png",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad blanditiis consequatur consequuntur itaque modi odio officia voluptates! Autem blanditiis delectus error ipsa ipsam, magnam natus nobis placeat quae quidem reiciendis.",
    github: "https://github.com/Sadashii",
    linkedin: "www.linkedin.com/in/tanishq-sangwan"
  }
];

const Team = () => {
  
  const teamCard = (member) => {
    return (
      <Card variant={"outlined"} sx={{ width: 275, display: "flex", justifyContent: "space-between", flexDirection: "column", pb: 1, borderRadius: 4 }}>
        <CardMedia
          component="img"
          sx={{ boxShadow: "0px 0px 4px -1px rgba(0,0,0,0.75);" }}
          image={member.profile}
          alt="Profile Image"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {member.name}
            </Typography>
            <Typography sx={{ fontWeight: "semibold", marginBottom: 1.5 }} variant={"subtitle1"}>
              {member.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {member.description}
            </Typography>
          </CardContent>
          
          <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
            <Link href={member.github} target={"_blank"}>
              <IconButton>
                <GitHubIcon/>
              </IconButton>
            </Link>
            <Link href={member.linkedin} target={"_blank"}>
              <IconButton>
                <LinkedInIcon/>
              </IconButton>
            </Link>
          
          </Box>
        </Box>
      </Card>
    );
  };
  
  return (
    <Layout>
      {GeneralHelper.generateHead("The Team")}
      <Container maxWidth={"md"} style={{ marginTop: "6rem" }}>
        <Typography component="div" variant="h2" sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "4rem" }}>
          Meet the team
        </Typography>
        
        <Grid container spacing={3} justifyContent={"space-between"} alignItems={"center"}>
          {team.map(member => teamCard(member))}
        </Grid>
      
      </Container>
    </Layout>
  );
};

export default Team;