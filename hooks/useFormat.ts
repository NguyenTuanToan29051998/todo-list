const useFormat = () => {

  const formatDate = (UNIX_timestamp: string) => {
    const timeValue = new Date(UNIX_timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return timeValue.toLocaleDateString('en-GB', options as any);
  };

  return {
    formatDate,
  };
};

export default useFormat;
