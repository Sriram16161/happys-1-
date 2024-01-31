import React, {
  ChangeEvent,
  DetailedHTMLProps,
  Ref,
  TextareaHTMLAttributes,
  useCallback,
  useLayoutEffect,
  useMemo,
} from 'react';
import { mergeRefs } from '../../services/mergeRefs';
import { StyledTextArea } from './styles';

export type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  ref?: Ref<HTMLTextAreaElement>;
};

export const TextArea = (props: TextAreaProps) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const ref = useMemo(() => mergeRefs(textAreaRef, props.ref ?? null), [props.ref]);

  const updateHeight = useCallback(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = 'inherit';
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight}px`;
  }, []);

  useLayoutEffect(() => updateHeight(), []);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange?.(event);
    updateHeight();
  };

  return <StyledTextArea rows={1} {...props} onChange={handleChange} ref={ref} />;
};
