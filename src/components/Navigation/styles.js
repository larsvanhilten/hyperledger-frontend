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
    marginTop: "15%",
    marginLeft: "-30%"
  },
  chipLabel: {
    color: colors.blue,
    fontWeight: "bold"
  },
  iconRight: {
    display: "inline-flex",
    justifyContent: "space-between",
    height: "80%",
    marginRight: "25px",
    cursor: "pointer",
    alignItems: "stretch"
  },
  icon: {
    color: colors.yellow
  },
  badge: {
    color: colors.yellow,
    backgroundColor: colors.blue,
    border: `1px solid ${colors.yellow}`
  }
};