export default {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
    minHeight: 63,
  },
 "&singleLine": {
  display: "inline-block",
  width: 180,
  maxWidth: '95%', // Added max width
  height: '10', // Added height auto
  padding: 1,
  border: "2px inset transparent",

  input: {
    padding: 1,
    border: "2px inset",
  },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
    },
    "&focused": {
      backgroundColor: "#cee4e5",
    },
  },

  "@media only screen and (max-width: 768px)": {
    singleLine: {
      width: '100%',
    },
  },
};