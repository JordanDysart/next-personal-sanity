import AlertBanner from 'components/AlertBanner'
import ContactForm from 'components/ContactForm'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
        <footer className="bg-gray-100 w-full h-1/3 p-32">
          <div className="flex flex-row items-center justify-around h-full">
            <h2 className="text-2xl font-bold text-gray-800">
              Want to get in touch?
            </h2>
            <ContactForm />
          </div>
        </footer>
      </div>
    </>
  )
}
