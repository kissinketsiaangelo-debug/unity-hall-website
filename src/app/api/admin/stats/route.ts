import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [
      totalUsers,
      openTickets,
      activeComplaints,
      totalAssets,
      recentIncidents,
      totalPolls,
      totalDonations,
      totalEvents,
      activeMaintenance,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.helpdeskTicket.count({ where: { status: { not: 'RESOLVED' } } }),
      prisma.complaint.count({ where: { status: { notIn: ['RESOLVED', 'REJECTED'] } } }),
      prisma.asset.count({ where: { status: 'ACTIVE' } }),
      prisma.incidentReport.count({
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      }),
      prisma.poll.count({ where: { isActive: true } }),
      prisma.donation.count(),
      prisma.event.count({ where: { date: { gte: new Date() } } }),
      prisma.maintenanceRequest.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED'] } } }),
    ]);

    return NextResponse.json({
      totalUsers,
      openTickets,
      activeComplaints,
      totalAssets,
      recentIncidents,
      totalPolls,
      totalDonations,
      totalEvents,
      activeMaintenance,
    });
  } catch (error) {
    console.error('GET /api/admin/stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
