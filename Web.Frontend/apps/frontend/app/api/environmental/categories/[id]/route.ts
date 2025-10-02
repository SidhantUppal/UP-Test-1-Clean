import { NextRequest, NextResponse } from 'next/server';

// DELETE /api/environmental/categories/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Implement database deletion logic
    // For now, return success response
    return NextResponse.json(
      { message: 'Environmental category deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting environmental category:', error);
    return NextResponse.json(
      { error: 'Failed to delete environmental category' },
      { status: 500 }
    );
  }
}