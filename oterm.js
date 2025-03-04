import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  FormGroup,
  FormControlLabel,
  Switch,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  CardActionArea,
  MenuList,
  MenuItem,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from './menu2';
import fehgatya from './fehgatya.png';
import fehpolo from './fehpolo.png';
import fehpull from './fehpull.png';
import kekgatya from './kekgatya.png';
import kekpolo from './kekpolo.png';
import kekpull from './kekpull.png';
import fekgatya from './fekgatya.png';
import fekpolo from './fekpolo.png';
import fekpull from './fekpull.png';
import zoldgatya from './zoldgatya.png';
import zoldpolo from './zoldpolo.png';
import zoldpull from './zoldpull.png';
import bezsgatya from './bezsgatya.png';
import bezspolo from './bezspolo.png';
import bezspull from './bezspull.png';

const Oterm = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartItemCount = cartItems.reduce((total, item) => total + item.mennyiseg, 0);
  const anchorRef = useRef(null);
  const navigate = useNavigate();
    const dummyProducts = [
      { id: 1, nev: "Fehér nadrág", termekleiras: "Kényelmes fehér nadrág", ar: 5000, imageUrl: fehgatya },
      { id: 2, nev: "Fehér póló", termekleiras: "Klasszikus fehér póló", ar: 3500, imageUrl: fehpolo },
      { id: 3, nev: "Fehér pulóver", termekleiras: "Meleg fehér pulóver", ar: 7500, imageUrl: fehpull },
      { id: 4, nev: "Kék nadrág", termekleiras: "Kényelmes kék nadrág", ar: 5000, imageUrl: kekgatya },
      { id: 5, nev: "Kék póló", termekleiras: "Klasszikus kék póló", ar: 3500, imageUrl: kekpolo },
      { id: 6, nev: "Kék pulóver", termekleiras: "Meleg kék pulóver", ar: 7500, imageUrl: kekpull },
      { id: 7, nev: "Fekete nadrág", termekleiras: "Kényelmes fekete nadrág", ar: 5000, imageUrl: fekgatya },
      { id: 8, nev: "Fekete póló", termekleiras: "Klasszikus fekete póló", ar: 3500, imageUrl: fekpolo },
      { id: 9, nev: "Fekete pulóver", termekleiras: "Meleg fekete pulóver", ar: 7500, imageUrl: fekpull },
      { id: 10, nev: "Zöld nadrág", termekleiras: "Kényelmes zöld nadrág", ar: 5000, imageUrl: zoldgatya },
      { id: 11, nev: "Zöld póló", termekleiras: "Klasszikus zöld póló", ar: 3500, imageUrl: zoldpolo },
      { id: 12, nev: "Zöld pulóver", termekleiras: "Meleg zöld pulóver", ar: 7500, imageUrl: zoldpull },
      { id: 13, nev: "Bézs nadrág", termekleiras: "Kényelmes bézs nadrág", ar: 5000, imageUrl: bezsgatya },
      { id: 14, nev: "Bézs póló", termekleiras: "Klasszikus bézs póló", ar: 3500, imageUrl: bezspolo },
      { id: 15, nev: "Bézs pulóver", termekleiras: "Meleg bézs pulóver", ar: 7500, imageUrl: bezspull },
    ];
  const filteredProducts = selectedCategory 
    ? dummyProducts.filter(product => {
        if (selectedCategory === 'Pólók') return product.nev.includes('póló');
        if (selectedCategory === 'Nadrágok') return product.nev.includes('nadrág');
        if (selectedCategory === 'Pulóverek') return product.nev.includes('pulóver');
        return true;
      })
    : dummyProducts;

  useEffect(() => {
    const checkLoginStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.username || user.felhasznalonev || 'Felhasználó');
      }
    };
    checkLoginStatus();
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event = {}) => {
    if (event.target && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setOpen(false);
    navigate('/sign');
  };

  const toggleSideMenu = () => {
    setSideMenuActive((prev) => !prev);
  };

  const handleCartClick = () => {
    navigate('/kosar');
  };

  return (
    <div style={{
      backgroundColor: darkMode ? '#555' : '#f5f5f5',
      color: darkMode ? 'white' : 'black',
      minHeight: '100vh',
      paddingBottom: '100px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: darkMode ? '#333' : '#333',
        padding: '10px 20px',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <IconButton
          onClick={toggleSideMenu}
          style={{ color: darkMode ? 'white' : 'white' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h1"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: darkMode ? 'white' : 'white',
            margin: 0,
          }}
        >
          Adali Clothing
        </Typography>

        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <IconButton
                onClick={handleCartClick}
                sx={{
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Badge 
                  badgeContent={cartItemCount} 
                  color="primary"
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      backgroundColor: '#fff', 
                      color: '#333' 
                    } 
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button
                ref={anchorRef}
                onClick={handleToggle}
                sx={{
                  color: '#fff',
                  zIndex: 1300,
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  padding: '5px 10px',
                }}
              >
                Profil
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1300 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>{userName} profilja</MenuItem>
                          <MenuItem onClick={handleClose}>Fiókom</MenuItem>
                          <MenuItem onClick={handleLogout}>Kijelentkezés</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          ) : (
            <>
              <Button
                component={Link}
                to="/sign"
                sx={{
                  color: '#fff',
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#333',
                  },
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{
                  color: '#fff',
                  border: '1px solid #fff',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#333',
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </div>

      <Box sx={{
        position: 'fixed',
        top: 0,
        left: sideMenuActive ? 0 : '-250px',
        width: '250px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 1200,
        transition: 'left 0.1s ease-in-out',
      }}>
        <Menu sideMenuActive={sideMenuActive} toggleSideMenu={toggleSideMenu} />
      </Box>

      <FormGroup sx={{ position: 'absolute', top: 60, right: 20 }}>
        <FormControlLabel
          control={
            <Switch
              color="default"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
          }
          label="Dark Mode"
        />
      </FormGroup>

      <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: darkMode ? 'white' : 'black' }}>
          Összes Termékünk
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 2, 
          mb: 4, 
          flexWrap: 'wrap',
          marginTop: '20px'
        }}>
          <Button 
            variant="contained"
            onClick={() => setSelectedCategory(null)}
            sx={{ 
              backgroundColor: !selectedCategory ? '#333' : '#555',
              color: 'white',
              '&:hover': {
                backgroundColor: !selectedCategory ? '#444' : '#666',
              }
            }}
          >
            Összes
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedCategory('Pólók')}
            sx={{ 
              backgroundColor: selectedCategory === 'Pólók' ? '#333' : '#555',
              color: 'white',
              '&:hover': {
                backgroundColor: selectedCategory === 'Pólók' ? '#444' : '#666',
              }
            }}
          >
            Pólók
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedCategory('Nadrágok')}
            sx={{ 
              backgroundColor: selectedCategory === 'Nadrágok' ? '#333' : '#555',
              color: 'white',
              '&:hover': {
                backgroundColor: selectedCategory === 'Nadrágok' ? '#444' : '#666',
              }
            }}
          >
            Nadrágok
          </Button>
          <Button
            variant="contained"
            onClick={() => setSelectedCategory('Pulóverek')}
            sx={{ 
              backgroundColor: selectedCategory === 'Pulóverek' ? '#333' : '#555',
              color: 'white',
              '&:hover': {
                backgroundColor: selectedCategory === 'Pulóverek' ? '#444' : '#666',
              }
            }}
          >
            Pulóverek
          </Button>
        </Box>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={`product-${product.id}`}>
                <Link to={`/termek/${product.id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ 
                    height: '500px',
                    backgroundColor: darkMode ? '#333' : 'white',
                    color: darkMode ? 'white' : 'black',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}>
                    <Box sx={{ position: 'relative', height: '350px' }}>
                      <CardMedia
                        component="img"
                        sx={{ 
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain'
                        }}
                        image={product.imageUrl}
                          alt={product.nev}
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="h6" color={darkMode ? 'white' : 'black'}>
                          {product.nev}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {product.ar} Ft
                        </Typography>
                        <Typography variant="body2" color={darkMode ? 'grey.300' : 'text.secondary'}>
                          {product.termekleiras}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
    );
  };
  
  export default Oterm;
  
  