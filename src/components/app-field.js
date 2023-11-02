// import React from 'react';
// import {
//   Box,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   TextField,
// } from '@mui/material';
// import { useFormik } from 'formik';

// export const AppField = ({
//   value,
//   name,
//   label,
//   formik,
//   className,
//   type = 'text',
//   placeholder,
//   required,
//   disabled,
//   hidden,
//   autoFocus,
//   icon,
//   iconPosition,
//   onClickIcon,
//   extraErrorMessage,
//   helperText,
//   renderCustomError,
// }) => {
//   return (
//     <>
//       {!hidden && (
//         <Box className={className}>
//           <TextField
//             label={
//               required ? (
//                 <>
//                   {label} {'(*)'}
//                 </>
//               ) : (
//                 label
//               )
//             }
//             name={name}
//             onChange={formik.handleChange}
//             value={value ?? formik.values[name]}
//             error={
//               (!!formik.errors[name] && !!formik.touched[name]) ||
//               !!extraErrorMessage
//             }
//             fullWidth
//             className="mb-3"
//             type={type}
//             placeholder={placeholder}
//             disabled={disabled}
//             autoFocus={autoFocus}
//             InputProps={{
//               startAdornment:
//                 Boolean(icon) &&
//                 iconPosition === 'start' && (
//                   <InputAdornment position="start">
//                     <IconButton
//                       onClick={onClickIcon}
//                       size="small"
//                       tabIndex={-1}
//                     >
//                       {icon}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               endAdornment:
//                 Boolean(icon) &&
//                 iconPosition === 'end' && (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={onClickIcon}
//                       size="small"
//                       tabIndex={-1}
//                     >
//                       {icon}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//             }}
//           />
//           {helperText && (
//             <FormHelperText className="-mt-2 mb-3">{helperText}</FormHelperText>
//           )}
//           {extraErrorMessage && (
//             <>
//               <FormHelperText error className="-mt-2 mb-3">
//                 {extraErrorMessage}
//               </FormHelperText>
//             </>
//           )}
//           {!renderCustomError && formik.errors[name] && formik.touched[name] ? (
//             <>
//               <FormHelperText error className="-mt-2 mb-3">
//                 {formik.errors[name] as string}
//               </FormHelperText>
//             </>
//           ) : null}
//           {renderCustomError && renderCustomError()}
//         </Box>
//       )}
//     </>
//   );
// };
