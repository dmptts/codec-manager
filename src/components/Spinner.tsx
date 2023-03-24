import { ReactComponent as SpinnerIcon } from '../img/icon-spinner.svg';

interface ISpinnerProps {
  className?: string;
}

export default function Spinner({ className }: ISpinnerProps) {
  return <SpinnerIcon className={className} />;
}
