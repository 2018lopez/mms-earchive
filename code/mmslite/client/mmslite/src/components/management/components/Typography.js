
import {Box} from '@mui/system'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'

const StyledBox = styled(Box)(({ theme, textTransformStyle, ellipsis }) => ({
    textTransform: textTransformStyle || 'none',
    whiteSpace: ellipsis ? 'nowrap' : 'normal',
    overflow: ellipsis ? 'hidden' : '',
    textOverflow: ellipsis ? 'ellipsis' : '',
    // color: theme.palette.primary.contrastText,
}))

export const Small = ({
    children,
    className,
    ellipsis,
    textTransform,
    ...props
}) => {
    return (
        <StyledBox
            textTransformStyle={textTransform}
            ellipsis={ellipsis}
            className={clsx({
                [className || '']: true,
            })}
            component="small"
            fontSize="12px"
            fontWeight="500"
            lineHeight="1.5"
            {...props}
        >
            {children}
        </StyledBox>
    )
}