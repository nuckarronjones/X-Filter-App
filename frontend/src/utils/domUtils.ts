export const createLabel = (): HTMLElement => {
  const label = document.createElement("div");

  label.className = "x-filter-label";
  label.innerHTML = "<b>X Filter:</b>&nbsp;Filtered Content";

  label.style.position = "absolute";
  label.style.top = "0";
  label.style.left = "0";
  label.style.width = "auto";
  label.style.height = "30px";
  label.style.backgroundColor = "rgba(255, 255, 255)";
  label.style.opacity = ".3";
  label.style.color = "black";
  label.style.padding = "4px 8px";
  label.style.margin = "10px";
  label.style.fontSize = "12px";
  label.style.borderRadius = "4px";

  label.style.display = "flex";
  label.style.alignItems = "center";

  return label;
};
