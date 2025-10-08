import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById, createUser } from '@/lib/actions/user.actions';
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
  const { userId } = auth();
  const transformation = transformationTypes[type];

  if(!userId) redirect('/sign-in')

  let user = await getUserById(userId);

  // If user doesn't exist in database yet, create one
  if (!user) {
    const clerkUser = await currentUser();
    
    if (clerkUser) {
      const newUserData = {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.username || `${clerkUser.firstName}${clerkUser.lastName}` || 'user',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
        photo: clerkUser.imageUrl || '',
      };
      
      user = await createUser(newUserData);
    }
    
    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-gray-600">Failed to create user profile. Please try again.</p>
          </div>
        </div>
      );
    }
  }

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10">
        <TransformationForm 
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTransformationTypePage