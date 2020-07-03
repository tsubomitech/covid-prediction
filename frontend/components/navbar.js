import Link from "./link";
import { Container, Typography, makeStyles } from "@material-ui/core";
import theme from './theme'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'teal',
  },
  subtitle: {
    color: theme.palette.text.secondary,
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <Container xs={12}>
      <Link href="/" className={classes.title}>
        <Typography align="center" variant="h1" >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
      </Link>
      <Typography align="center" variant="h4" className={classes.subtitle}>
        Using ML to fight COVID-19
      </Typography>
    </Container>
  );
}
