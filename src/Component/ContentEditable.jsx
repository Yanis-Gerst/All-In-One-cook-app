import React from "react";

const ContentEditable = ({
  className,
  data,
  onBlur,
  onKeyPress,
  tagName = "div",
  children,
}) => {
  const CustomTag = tagName;
  return (
    <>
      <CustomTag
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
