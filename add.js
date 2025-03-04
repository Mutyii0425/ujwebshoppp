import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton,
  TextField,
  Paper,
  Container,
  FormGroup,
  FormControlLabel,
  Switch,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Badge,
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from './menu2';
import Footer from './footer';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function Add() {
 
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartItemCount = cartItems.reduce((total, item) => total + item.mennyiseg, 0);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
    const handleSubmit = async () => {
      const termekAdatok = {
        kategoriaId: parseInt(selectedCategory),
        ar: parseInt(price),
        nev: title,
        leiras: description,
        meret: size,
        imageUrl: selectedImages[0],
        images: selectedImages // Send as array
      };

      try {
        const response = await fetch('http://localhost:5000/usertermekek', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(termekAdatok)
        });

        if (response.ok) {
          alert('Sikeres feltöltés!');
          navigate('/vinted');
        }
      } catch (error) {
        console.error('Hiba:', error);
      }
    };
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const fileInputRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  

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

  useEffect(() => {
    fetch('http://localhost:5000/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log('Error:', error));
  }, []);

  // Adjuk hozzá ezt a useEffect-et
useEffect(() => {
  if (sideMenuActive) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [sideMenuActive]);

const [selectedImages, setSelectedImages] = useState([]);

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files);
  
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
        
        setSelectedImages(prev => [...prev, compressedImage]);
      };
    };
    reader.readAsDataURL(file);
  });
};const handleDragOver = (event) => {
  event.preventDefault();
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
};

const handleCartClick = () => {
    navigate('/kosar');
};

<input
    type="file"
    hidden
    multiple
    ref={fileInputRef}
    onChange={handleImageUpload}
    accept="image/*"
/>
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
  

  return (
<div style={{
  backgroundColor: darkMode ? '#555' : '#f5f5f5',
  color: darkMode ? 'white' : 'black',
  minHeight: '100vh',
  paddingBottom: '100px'  // Új sor
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

      <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Ruha feltöltése
          </Typography>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: darkMode ? 'grey.500' : 'grey.300',
              borderRadius: 2,
              p: 3,
              mb: 3,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              hidden
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
            />
            
            {selectedImages && selectedImages.length > 0 ? (
              <Grid container spacing={2}>
                {selectedImages.map((image, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: '200px',
                        width: '100%',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={image}
                        alt={`Feltöltött kép ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box>
                <CloudUploadIcon sx={{ fontSize: 60, mb: 2 }} />
                <Typography>
                  Húzd ide a képeket vagy kattints a feltöltéshez
                </Typography>
              </Box>
            )}
          </Box>
            <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
              <InputLabel sx={{ 
                color: darkMode ? 'grey.300' : 'grey.700'
              }}>Kategória</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  color: darkMode ? 'white' : 'black',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'grey.500' : 'grey.300',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'grey.400' : 'grey.400',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'grey.300' : 'grey.500',
                  },
                  '& .MuiSelect-icon': {
                    color: darkMode ? 'grey.300' : 'grey.700',
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: darkMode ? '#333' : '#fff',
                      '& .MuiMenuItem-root': {
                        color: darkMode ? 'white' : 'black',
                        '&:hover': {
                          bgcolor: darkMode ? '#444' : '#f5f5f5',
                        },
                        '&.Mui-selected': {
                          bgcolor: darkMode ? '#555' : '#e0e0e0',
                          '&:hover': {
                            bgcolor: darkMode ? '#666' : '#d5d5d5',
                          }
                        }
                      }
                    }
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.cs_azonosito} value={category.cs_azonosito}>
                    {category.cs_nev}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              label="Ruha neve"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? 'white' : 'black',
                  '& fieldset': {
                    borderColor: darkMode ? 'grey.500' : 'grey.300',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'grey.300' : 'grey.700',
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              label="Ár"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? 'white' : 'black',
                  '& fieldset': {
                    borderColor: darkMode ? 'grey.500' : 'grey.300',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'grey.300' : 'grey.700',
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              sx={{ mb: 2 }}
              label="Leírás"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? 'white' : 'black',
                  '& fieldset': {
                    borderColor: darkMode ? 'grey.500' : 'grey.300',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'grey.300' : 'grey.700',
                },
              }}
            />
              <TextField
                select
                fullWidth
                margin="normal"
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    color: darkMode ? 'white' : 'black',
                    '& fieldset': {
                      borderColor: darkMode ? 'grey.500' : 'grey.300',
                    },
                    '& .MuiSelect-icon': {
                      color: darkMode ? 'white' : 'black',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: darkMode ? 'grey.300' : 'grey.700',
                  }
                }}
                label="Méret"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: darkMode ? '#333' : '#fff',
                        '& .MuiMenuItem-root': {
                          color: darkMode ? 'white' : 'black',
                          '&:hover': {
                            bgcolor: darkMode ? '#444' : '#f5f5f5',
                          },
                          '&.Mui-selected': {
                            bgcolor: darkMode ? '#555' : '#e0e0e0',
                            '&:hover': {
                              bgcolor: darkMode ? '#666' : '#d5d5d5',
                            }
                          }
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
                <MenuItem value="XXL">XXL</MenuItem>
              </TextField>
      <Button
    onClick={handleSubmit}
    variant="contained"
    fullWidth
    sx={{
      mt: 3,
      mb: 2,
      backgroundColor: darkMode ? '#555' : 'primary.main',
      '&:hover': {
        backgroundColor: darkMode ? '#666' : 'primary.dark',
      }
    }}
  >
    Feltöltés
  </Button>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default Add;