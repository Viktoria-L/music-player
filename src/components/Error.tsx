interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div>
      <h3>Something went wrong when fetching data: </h3>
      <p>{message}</p>
    </div>
  );
};
