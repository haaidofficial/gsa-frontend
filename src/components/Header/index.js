import { AppBar, Box, Button, Collapse, Divider, Grid2, List, ListItemButton, ListItemText, Menu, MenuItem, SwipeableDrawer, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import { classNames } from '@/utils/util';
import React, { useEffect, useRef, useState } from 'react';
import { navigationMenu } from '@/helpers/navigationLinks';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/router';
import { BASE_URL, Endpoints } from '@/constants/apiEndpoints';
import axios from 'axios';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


export default function Header() {
    const router = useRouter();
    const [otherProducts, setOtherProducts] = useState([]);
    const [productsNavList, setProductsNavList] = useState(navigationMenu);
    const [isMobile, setIsMobile] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    const pathname = router.pathname;
    if ((pathname === "/admin/login" || pathname === "/admin/register")) {
        return null;
    }

    useEffect(() => {

        let headerHeight = 20;

        const handleScroll = () => {
            if (window.scrollY > headerHeight) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        fetchProductsNavigation();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const navList = JSON.parse(JSON.stringify(navigationMenu));
        if (otherProducts.length) {

            const list = navList.map((menu) => {
                if (menu.label === 'PRODUCTS') {
                    menu.submenu = otherProducts?.map(item => ({ label: item?.title, url: `/products/${item?.pageUrl}` }));
                }
                return menu;
            })
            setProductsNavList(list);
        }
        else {

            const foundIndex = navList?.findIndex(item => item?.label === 'PRODUCTS');
            if (foundIndex !== -1) {
                navList.splice(foundIndex, 1)
            }
            setProductsNavList(navList);
        }

    }, [otherProducts.length]);

    const fetchProductsNavigation = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}${Endpoints.GetProductsNavigation}?skip=${0}&limit=${10}`
            );

            if (response.data) {
                setOtherProducts(response.data.products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);


    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box>
            {/* Main Navbar */}
            <AppBar
                position={isFixed ? 'fixed' : 'static'}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for better visibility
                    zIndex: 1200, // Ensure it's above other content
                    top: 0, // Stick to the top
                }}
                className={`${styles.headerMain} ${styles.headerMainBottom}`}
            >
                <Box className={''}>
                    <Grid2 container alignItems="center" spacing={2}>
                        {/* Logo and Name (8 columns) */}
                        <Grid2 item xs={12} size={3}>
                            <div className={`${styles.logoContainer} ${styles.desktopHeader}`}>
                                <Box className={styles.logo}>
                                    <Image
                                        src="/assets/logo.jpeg"
                                        alt="S R GAS AGENCY Logo"
                                        width={100}
                                        height={120}
                                        className={styles.objectFitImg}
                                        onClick={() => router.push('/')}
                                    />
                                </Box>
                            </div>
                        </Grid2>

                        {/* Certification Badges (4 columns) */}
                        <Grid2 item xs={12} size={9}>
                            {/* Navigation Links */}

                            <Box className={`${styles.navigation} ${styles.desktopHeader}`}>
                                <Box
                                    className={classNames(styles.navigationLinks, styles.headerPadPx)}
                                    sx={{
                                        display: 'flex',
                                        gap: 3,
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                    }}
                                >
                                    {productsNavList.map((menu) => (
                                        <Button
                                            key={menu.label}
                                            sx={{
                                                color: 'white',
                                                textTransform: 'none',
                                                fontWeight: 300,
                                            }}
                                            // onMouseOver={menu.label === 'PRODUCTS' ? handleMenuClick : undefined}
                                            // onMouseOut={handleMenuClose}
                                            className={styles.productMenuBtn}
                                            onClick={menu.label === 'PRODUCTS' ? handleMenuClick : undefined}
                                        >
                                            {
                                                menu?.submenu ? <div className={classNames(styles.navigationMenu)}>
                                                    <span className={styles.navLink}>{menu.label}</span>
                                                    <KeyboardArrowDownIcon />
                                                </div>
                                                    : <Link href={menu.url} className={styles.navLink}>{menu.label}</Link>
                                            }
                                        </Button>
                                    ))}
                                </Box>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Box>
            </AppBar>




            {/* Submenu for "PRODUCTS" */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={`${styles.subMenu} ${styles.productsList}`}

            >
                {productsNavList
                    .find((menu) => menu.label === 'PRODUCTS')
                    ?.submenu?.map((submenu) => (
                        <MenuItem className={styles.subMenuItem} key={submenu.label} onClick={handleMenuClose}>
                            <Link href={submenu.url} className={styles.subMenuLink}>
                                <Typography>{submenu.label}</Typography>
                            </Link>
                        </MenuItem>
                    ))}
            </Menu>

            <MobileMenu productsNavList={productsNavList} />
        </Box>
    );
}


const MobileMenu = ({ productsNavList }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDrawer = (anchor, open) => () => {
        setIsOpen(open);
    };

    const handleClick = () => {
        setSubmenuOpen(!submenuOpen);
    };

    useEffect(() => {

        let headerHeight = 20;

        const handleScroll = () => {
            if (window.scrollY > headerHeight) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, false)}
            className={`${styles.navMobileMenu}`}
        >
            {/* Add the hamburger menu toggle inside the navigation menu */}

            <div className={styles.hamburgerWrapper}>
                <div
                    className={`${styles.menuToggle} ${isOpen ? styles.change : ''}`}
                    onClick={toggleMenu}
                    style={{ margin: '10px 10px 0 10px' }}
                >
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>
            </div>

            <List
                sx={{ width: '100%', maxWidth: 360 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {productsNavList.map((menu, index) => (
                    <React.Fragment key={index}>
                        {menu?.submenu ? (
                            <ListItemButton onClick={handleClick} className={styles.mobileMenuButton}>
                                <ListItemText primary={menu.label} className={styles.mobileMenuText} />
                                {submenuOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        ) : (
                            <ListItemButton>
                                <Link href={menu.url} className={styles.mobileMenuLink} onClick={() => setIsOpen(false)}>
                                    <ListItemText
                                        primary={menu.label}
                                        className={styles.mobileMenuText}
                                    />
                                </Link>

                            </ListItemButton>
                        )}
                        {menu?.label === 'PRODUCTS' && (
                            <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding className={`${styles.productsList}`}>
                                    {productsNavList
                                        .find((menu) => menu.label === 'PRODUCTS')
                                        ?.submenu?.map((submenuItem, index) => (
                                            <ListItemButton

                                                key={index} sx={{ pl: 4 }}>
                                                <Link href={submenuItem.url} className={styles.mobileMenuLink}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <ListItemText className={styles.mobileMenuText} primary={submenuItem.label} />
                                                </Link>

                                            </ListItemButton>
                                        ))}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <div className={`${!isOpen ? styles.menuBarBg : ''} ${isFixed ? styles.fixedMobileMenu : ''} ${styles.mobileHeader}`}>
            <Box className={styles.logo}>
                <Image
                    src="/assets/logo.jpeg"
                    alt="Logo"
                    width={100}
                    height={80}
                    className={styles.objectFitImg}
                    onClick={() => router.push('/')}
                />
            </Box>
            {['top'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {/* Hamburger menu outside the drawer */}
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <div
                            className={`${styles.menuToggle} ${isOpen ? styles.change : ''}`}
                            onClick={toggleMenu}
                        >
                            <div className={`${styles.bar} ${styles.barWhite}`}></div>
                            <div className={`${styles.bar} ${styles.barWhite}`}></div>
                            <div className={`${styles.bar} ${styles.barWhite}`}></div>
                        </div>
                    </Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={isOpen}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {/* Hamburger menu inside the drawer */}
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
};