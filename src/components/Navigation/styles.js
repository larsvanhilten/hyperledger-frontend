import colors from '../../constants';

export default {
  appBar: {
    position: "fixed",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: ""
  },
  chip: {
    backgroundColor: colors.yellow,
    textTransform: "uppercase",
  },
  chipLabel: {
    color: colors.blue,
    fontWeight: "bold"
  },
  iconRight: {
    display: "inline-flex",
    justifyContent: "space-between",
    height: "80%",
    padding: "3px",
    cursor: "pointer",
    alignItems: "center",
  },
  icon: {
    color: colors.yellow
  },
  badge: {
    color: colors.yellow,
    backgroundColor: colors.blue,
    border: `1px solid ${colors.yellow}`
  },
  loader: {
    position: "fixed",
    zIndex: 50,
    top: "90%",
    left:" 50%",
  }
};