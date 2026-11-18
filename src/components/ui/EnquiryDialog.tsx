"use client";

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  ListSubheader,
  MenuItem as MuiMenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

import { CATEGORIES, type MenuItem as Product } from "@/data/menu";

export type EnquiryChannel = "whatsapp" | "email";

export interface EnquiryDialogProps {
  open: boolean;
  onClose: () => void;

  title?: string;
  subtitle?: string;
  enquiryLabel: string;

  /** Everything the visitor can pick from in the dropdown */
  menuOptions: Product[];
  /** Pre-selected item (e.g. the card they clicked) */
  defaultItemId?: string;

  whatsappNumber: string;
  email: string;
  recipientName?: string;
  defaultChannel?: EnquiryChannel;
}

const INK = "#2A1410";
const RED = "#C8281E";
const MUTED = "#6B4A44";

const accent = {
  whatsapp: { bg: "#1FA855", hover: "#168A44" },
  email: { bg: RED, hover: "#9C1C14" },
} as const;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: "14px",
    "& fieldset": { borderColor: "rgba(42,20,16,0.18)" },
    "&:hover fieldset": { borderColor: "rgba(42,20,16,0.4)" },
    "&.Mui-focused fieldset": { borderColor: RED, borderWidth: 2 },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: RED },
};

const buildSubject = (p?: Product) => (p ? `Order: ${p.name}` : "");

const buildDetails = (p?: Product) =>
  p
    ? `I would like to order: ${p.name} (${p.price}).\n\nQuantity / size:\nFlavour:\nDate and time needed:\nPickup or home delivery:\n`
    : `Hi! I would like to know about...\n\nDate and time needed:\nPickup or home delivery:\n`;

function ItemRow({ p }: { p: Product }) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}
    >
      <Box
        component="span"
        sx={{
          width: 32,
          height: 32,
          borderRadius: "10px",
          bgcolor: p.tone,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {p.emoji}
      </Box>
      <Box component="span" sx={{ flex: 1, fontWeight: 600 }}>
        {p.name}
      </Box>
      <Box component="span" sx={{ color: MUTED, fontSize: 13 }}>
        {p.price}
      </Box>
    </Box>
  );
}

export default function EnquiryDialog({
  open,
  onClose,
  title = "Send an enquiry",
  subtitle = "Choose what you would like and we will get back to you.",
  enquiryLabel,
  menuOptions,
  defaultItemId = "",
  whatsappNumber,
  email,
  recipientName = "there",
  defaultChannel = "whatsapp",
}: EnquiryDialogProps) {
  const find = (id: string) => menuOptions.find((m) => m.id === id);

  const [channel, setChannel] = useState<EnquiryChannel>(defaultChannel);
  const [itemId, setItemId] = useState(defaultItemId);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [subjectDirty, setSubjectDirty] = useState(false);
  const [detailsDirty, setDetailsDirty] = useState(false);

  // Reset every time the dialog opens
  useEffect(() => {
    if (!open) return;
    const p = menuOptions.find((m) => m.id === defaultItemId);
    setChannel(defaultChannel);
    setItemId(defaultItemId);
    setSubject(buildSubject(p));
    setDetails(buildDetails(p));
    setSubjectDirty(false);
    setDetailsDirty(false);
  }, [open, defaultItemId, defaultChannel, menuOptions]);

  const onItemChange = (id: string) => {
    setItemId(id);
    const p = find(id);
    // only overwrite what the visitor has not typed themselves
    if (!subjectDirty) setSubject(buildSubject(p));
    if (!detailsDirty) setDetails(buildDetails(p));
  };

  const item = find(itemId);
  const canSend = subject.trim() !== "" && details.trim() !== "";
  const isWhatsApp = channel === "whatsapp";

  const handleSend = () => {
    if (!canSend) return;
    const itemLine = item ? `${item.name} (${item.price})` : "";

    if (isWhatsApp) {
      const message = [
        `Hi ${recipientName}!`,
        ``,
        `*${enquiryLabel}*`,
        ``,
        `*Subject:* ${subject.trim()}`,
        ...(itemLine ? [`*Item:* ${itemLine}`] : []),
        ``,
        `*Details:*`,
        details.trim(),
        ``,
        `Thank you!`,
      ].join("\n");

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      const body = [
        `Hi ${recipientName},`,
        ``,
        ...(itemLine ? [`Item: ${itemLine}`, ``] : []),
        details.trim(),
        ``,
        `Enquiry type: ${enquiryLabel}`,
        ``,
        `Thank you!`,
      ].join("\n");

      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        `[WakeCup Website] ${subject.trim()}`,
      )}&body=${encodeURIComponent(body)}`;
    }

    onClose();
  };

  // flat list: MUI Select needs direct children, not fragments
  const options = [
    <MuiMenuItem key="none" value="">
      <Box component="span" sx={{ color: MUTED }}>
        Not sure yet / something else
      </Box>
    </MuiMenuItem>,
    ...CATEGORIES.flatMap((cat) => {
      const inCat = menuOptions.filter((m) => m.category === cat);
      if (inCat.length === 0) return [];
      return [
        <ListSubheader
          key={`h-${cat}`}
          sx={{
            bgcolor: "#FFFAF2",
            color: RED,
            fontWeight: 800,
            fontSize: 12,
            lineHeight: "32px",
          }}
        >
          {cat}
        </ListSubheader>,
        ...inCat.map((m) => (
          <MuiMenuItem key={m.id} value={m.id} sx={{ py: 1 }}>
            <ItemRow p={m} />
          </MuiMenuItem>
        )),
      ];
    }),
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#FFFAF2",
            color: INK,
            borderRadius: "28px",
            overflow: "hidden",
            m: { xs: 2, sm: 4 },
            boxShadow: "0 30px 80px -20px rgba(74,14,10,0.65)",
          },
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          bgcolor: RED,
          color: "#fff",
          px: 3,
          py: 2.5,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontFamily: "var(--font-bodoni), serif",
              fontWeight: 600,
              fontSize: 28,
              lineHeight: 1.1,
            }}
          >
            {title}
          </Typography>
          <Typography sx={{ mt: 0.75, fontSize: 13, opacity: 0.9 }}>
            {subtitle}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="Close enquiry"
          sx={{
            color: RED,
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#FFE9A8" },
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pt: 3 }}>
        <ToggleButtonGroup
          exclusive
          fullWidth
          size="small"
          value={channel}
          onChange={(_, value: EnquiryChannel | null) => {
            if (value) setChannel(value);
          }}
          aria-label="Send enquiry via"
          sx={{
            mb: 2.5,
            "& .MuiToggleButton-root": {
              color: MUTED,
              borderColor: "rgba(42,20,16,0.18)",
              textTransform: "none",
              fontWeight: 700,
              gap: 1,
              py: 1,
              borderRadius: "999px",
            },
            "& .MuiToggleButton-root.Mui-selected": {
              color: "#fff",
              bgcolor: INK,
              borderColor: INK,
            },
            "& .MuiToggleButton-root.Mui-selected:hover": {
              bgcolor: "#4a2a24",
            },
          }}
        >
          <ToggleButton value="whatsapp">
            <WhatsAppIcon sx={{ fontSize: 18 }} />
            WhatsApp
          </ToggleButton>
          <ToggleButton value="email">
            <EmailIcon sx={{ fontSize: 18 }} />
            Email
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          fullWidth
          label="Subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setSubjectDirty(true);
          }}
          size="small"
          sx={fieldSx}
        />

        {/* MENU DROPDOWN */}
        <TextField
          select
          fullWidth
          label="What would you like?"
          value={itemId}
          onChange={(e) => onItemChange(e.target.value)}
          size="small"
          sx={{ mt: 2.5, ...fieldSx }}
          slotProps={{
            select: {
              displayEmpty: true,
              renderValue: (v) => {
                const p = menuOptions.find((m) => m.id === v);
                return p ? (
                  <ItemRow p={p} />
                ) : (
                  <Box component="span" sx={{ color: MUTED }}>
                    Choose from our menu
                  </Box>
                );
              },
              MenuProps: {
                slotProps: {
                  paper: {
                    sx: {
                      mt: 1,
                      maxHeight: 340,
                      borderRadius: "16px",
                      bgcolor: "#FFFAF2",
                      boxShadow: "0 20px 40px -12px rgba(74,14,10,0.4)",
                    },
                  },
                },
              },
            },
            inputLabel: { shrink: true },
          }}
        >
          {options}
        </TextField>

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Details"
          placeholder="Flavour, size, date you need it, delivery or pickup..."
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
            setDetailsDirty(true);
          }}
          sx={{ mt: 2.5, ...fieldSx }}
        />

        <Typography sx={{ mt: 1.5, fontSize: 12, color: MUTED }}>
          {isWhatsApp
            ? "This opens WhatsApp with your message ready. Review it and press send there."
            : "This opens your email app with your message ready. Review it and press send there."}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: MUTED }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={isWhatsApp ? <WhatsAppIcon /> : <EmailIcon />}
          onClick={handleSend}
          disabled={!canSend}
          sx={{
            bgcolor: accent[channel].bg,
            color: "#fff",
            px: 3,
            boxShadow: "none",
            "&:hover": { bgcolor: accent[channel].hover, boxShadow: "none" },
          }}
        >
          {isWhatsApp ? "Send via WhatsApp" : "Send via Email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
