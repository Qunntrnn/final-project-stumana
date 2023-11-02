export const AppButton = ({ color, className, children, ...otherProps }) => {
    let buttonClassName = 
    "px-4 py-2 text-sm rounded-full cursor-pointer"
    if (color === "red") {
        buttonClassName += " bg-red text-black ";
    } else if (color === "blue") {
        buttonClassName += " bg-blue text-black";
    } else if (color === "gray") {
        buttonClassName += " bg-gray-500 text-black";
    }
    if (className) {
        buttonClassName += " " + className;
    }
    return (
    <button className={buttonClassName} {...otherProps}>
        {children}
    </button>
    );
};