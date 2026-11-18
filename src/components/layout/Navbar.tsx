"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import assets from "@/assets";

const LOGO_SRC = assets.images.logo;
const INK = "#2A1410";
const RED = "#C8281E";
const PAPER = "#FFFAF2";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const orderSx = {
  bgcolor: "primary.main",
  color: "#fff",
  boxShadow: "0 8px 18px -8px rgba(200,40,30,0.7)",
  transition: "all .15s",
  "&:hover": {
    bgcolor: "primary.dark",
    transform: "translateY(-2px)",
  },
};

function Logo({ size }: { size: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        bgcolor: "#fff",
        boxShadow: `0 0 0 3px ${RED}, 0 8px 16px -6px rgba(42,20,16,0.4)`,
        flexShrink: 0,
      }}
    >
      <Image
        src={LOGO_SRC}
        alt="WakeCup"
        fill
        priority
        sizes="80px"
        style={{ objectFit: "contain", padding: 4 }}
      />
    </Box>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(255,250,242,0.88)",
          backdropFilter: "blur(14px)",
          color: INK,
          borderBottom: "1px solid rgba(42,20,16,0.1)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 72, md: 88 },
            justifyContent: { xs: "space-between", md: "center" },
            gap: { md: 5 },
          }}
        >
          <Link href="/" style={{ display: "flex" }} aria-label="WakeCup home">
            <Logo size={56} />
          </Link>

          {/* Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Button
                  key={l.href}
                  component={Link}
                  href={l.href}
                  disableRipple
                  sx={{
                    color: active ? "#fff" : INK,
                    bgcolor: active ? RED : "transparent",
                    fontSize: "0.95rem",
                    px: 2.5,
                    "&:hover": {
                      bgcolor: active ? RED : "rgba(200,40,30,0.1)",
                      color: active ? "#fff" : RED,
                    },
                  }}
                >
                  {l.label}
                </Button>
              );
            })}
            <Button
              component={Link}
              href="/reservation"
              variant="contained"
              sx={{ ml: 1.5, ...orderSx }}
            >
              Pre-order
            </Button>
          </Box>

          {/* Mobile */}
          <IconButton
            aria-label="open menu"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: INK,
              bgcolor: "#fff",
              boxShadow: "0 4px 12px -4px rgba(42,20,16,0.35)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: 360,
              bgcolor: PAPER,
              color: INK,
              borderTopLeftRadius: 28,
              borderBottomLeftRadius: 28,
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 2,
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: "flex" }}
          >
            <Logo size={52} />
          </Link>
          <IconButton
            aria-label="close menu"
            onClick={() => setOpen(false)}
            sx={{ color: INK, bgcolor: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 2.5, py: 0 }}>
          {links.map((l) => (
            <Box key={l.href}>
              <ListItemButton
                component={Link}
                href={l.href}
                onClick={() => setOpen(false)}
                sx={{ px: 0, py: 2 }}
              >
                <ListItemText
                  primary={l.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontFamily: "var(--font-bodoni), serif",
                        fontWeight: 600,
                        fontSize: "1.6rem",
                        color: pathname === l.href ? RED : INK,
                      },
                    },
                  }}
                />
              </ListItemButton>
              <Divider sx={{ borderColor: "rgba(42,20,16,0.12)" }} />
            </Box>
          ))}
        </List>

        <Box sx={{ px: 2.5, mt: 3 }}>
          <Button
            component={Link}
            href="/reservation"
            variant="contained"
            fullWidth
            size="large"
            onClick={() => setOpen(false)}
            sx={orderSx}
          >
            Pre-order a cake
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
