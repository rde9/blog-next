import { redirect } from 'next/navigation';

const ArchivesPage: React.FC = async () => {
  redirect('/archives/1');
};

export default ArchivesPage;
