import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, StyleProp, TextProps } from 'react-native';
import { useThemeStore } from '../store/theme.store';
import { fontFamily, fontSize } from '../theme/fonts';
import { scaleFont } from '../utils/responsive';

type Variant = 'h1' | 'h2' | 'h3' | 'headerTitle' | 'title' | 'subtitle' | 'body' | 'caption' | 'small' | 'button';

interface Props  extends TextProps{
    children: React.ReactNode;
    variant?: Variant;
    style?: StyleProp<TextStyle>;
    color?: string;
    numberOfLines?: number;
    uppercase?: boolean;
    center?: boolean;
    /**
     * If provided, and children is a string longer than maxChars,
     * the text will be truncated to maxChars and an ellipsis appended.
     */
    maxChars?: number;
};

const Text: React.FC<Props> = ({ children, variant = 'body', style, color, numberOfLines, uppercase = false, center = false, maxChars ,...Props}) => {
    const { theme } = useThemeStore();
    const styles = createStyles(theme.colors);

    const variantStyle = (styles as any)[variant] || styles.body;

    const composedStyle: StyleProp<TextStyle> = [
        variantStyle,
        center && { textAlign: 'center' } as TextStyle,
        color ? { color } : undefined,
        style,
    ];

    let content: React.ReactNode = children;

    if (typeof children === 'string') {
        let text = children;
        if (uppercase) text = text.toUpperCase();
        if (maxChars && text.length > maxChars) {
            const max = maxChars as number;
            // reserve 1 char for ellipsis
            const truncated = text.slice(0, Math.max(0, max - 1));
            text = `${truncated}…`;
        }
        content = text;
    } else {
        // non-string children: apply uppercase only if requested and child is simple
        if (uppercase) {
            try {
                // attempt to stringify and uppercase, fallback to original children
                const asString = String(children);
                content = asString.toUpperCase();
            } catch (e) {
                console.log(e);
                content = children;
            }
        }
    }

    return (
        <RNText numberOfLines={numberOfLines} style={composedStyle} {...Props}>
            {content}
        </RNText>
    );
};

export default Text;

const createStyles = (colors: any) =>
    StyleSheet.create({
        h1: { fontSize: scaleFont(fontSize.xl * 1.6), fontFamily: fontFamily.poppins.semiBold, color: colors.text },
        h2: { fontSize: scaleFont(fontSize.lg * 1.4), fontFamily: fontFamily.poppins.semiBold, color: colors.text },
        h3: { fontSize: scaleFont(fontSize.md * 1.2), fontFamily: fontFamily.poppins.semiBold, color: colors.text },
        headerTitle: { fontSize: scaleFont(fontSize.sm), fontFamily: fontFamily.poppins.semiBold, color: colors.text },
        title: { fontSize: scaleFont(fontSize.md), fontFamily: fontFamily.poppins.semiBold, color: colors.text },
        subtitle: {
            color: colors.primary,
            fontWeight: '600',
            fontFamily: fontFamily.poppins.semiBold,
            fontSize: fontSize.xs,
        },
        body: { fontSize: scaleFont(fontSize.md), fontFamily: fontFamily.poppins.regular, color: colors.text },
        caption: { fontSize: scaleFont(fontSize.xs), fontFamily: fontFamily.poppins.regular, color: colors.textSecondary },
        small: { fontSize: scaleFont(fontSize.xs * 0.9), fontFamily: fontFamily.poppins.regular, color: colors.textSecondary },
        button: { fontSize: scaleFont(fontSize.md), fontFamily: fontFamily.poppins.semiBold, color: colors.background },
    });
