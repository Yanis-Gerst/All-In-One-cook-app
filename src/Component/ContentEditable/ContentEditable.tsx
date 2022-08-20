import React from "react";

const ContentEditable = ({
  className = "",
  data = "",
  onBlur,
  onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") e.target.blur();
  },
  tagName = "div",
  children,
  ariaLabel = "",
}) => {
  const CustomTag: any = tagName;
  return (
    <>
      <CustomTag
        aria-label={ariaLabel}
        contentEditable="true"
        suppressContentEditableWarning={true}
        className={className}
        data-name={data}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      >
        {children}
      </CustomTag>
    </>
  );
};

export default ContentEditable;
