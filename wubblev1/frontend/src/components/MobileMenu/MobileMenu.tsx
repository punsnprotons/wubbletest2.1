import { Box, CardMedia } from "@mui/material"
import styles from "./MobileMenu.module.css"
import ProfileMenuNav from "../ProfileMenuNav/ProfileMenuNav"
import { useNavigate } from "react-router-dom"

const MobileMenu = () => {
  const navigate = useNavigate()
  return (
    <Box className={styles.menuContainer}>
        <Box className={styles.navLogoBox}>
          <Box className={styles.navLogoContainer}>
            <CardMedia
              onClick={() => navigate("/")}
              component="img"
              sx={{ cursor: 'pointer', marginLeft: '5vw' }}
              className={styles.navLogo}
              image={require("../../assets/logo/wbl-logo-and-text-sm.png")}
              loading="lazy"
            />
          </Box>
        </Box>
      <Box sx={{ marginRight: '5vw'}}>
        <ProfileMenuNav />
      </Box>
    </Box>
  )
}

export default MobileMenu